const socket = new WebSocket("ws://localhost:8080");


socket.addEventListener("open",GreetServer);
socket.addEventListener("message",GotMessage);

const textlog = document.getElementById("textlog");
const button = document.getElementById("button");
button.addEventListener("click",sendMessage);

function sendMessage(event){
    socket.send("응애");
}

function GreetServer(event){
    console.log("hi");
    // const jsonData = { type: 'greeting', message: 'Hello, server!' };
    // socket.send(JSON.stringify(jsonData));
    socket.send("Hello World");
}

function GotMessage(event){
    textlog.textContent +=("Message from server "+ event.data+"\n");
}