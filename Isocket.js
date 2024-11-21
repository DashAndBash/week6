//출처 : https://velog.io/@delay100/Socket

// 웹 소켓 로직이 들어있음
// ws 웹 소켓 - 양방향 통신이므로 client에도 작성해줘야 함 views/index.html
const WebSocket = require("ws");

function connectWith(server){
    const wss = new WebSocket.Server({ server });
    wss.on('connection', (ws, req) => {
        const ip = req.headers['x-forwarded-for']||req.socket.remoteAddress;
        console.log('새로운 클라이언트 접속', ip);
        ws.on('message', (message) => {
            //JSON 쓸때 console.log(JSON.parse(message));
            console.log("받은 메시지: ",message.toString());
            
            if(ws.readyState == ws.OPEN) { // OPEN(열림) - OPEN일때 만 에러 없이 메시지 전송 가능
                // + CONNECTION(연결 중), CLOSING(닫는 중), CLOSED(닫힘)
                ws.send('한 클라이언트에게... :'+message.toString());
            }

            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(`모두에게...: ${message}`);
                }
            });
        });
        ws.on('close', () => { // 연결 종료 시(클라이언트와 연결 끊겼을 때 발생)
            console.log('클라이언트 접속 해제', ip);
        });
    })
}

module.exports = connectWith;