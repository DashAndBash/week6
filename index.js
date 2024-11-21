const express = require('express');
const connectWith = require('./Isocket.js');
const path = require('path');

const app =express();

app.use(express.static(path.join(__dirname)));

const server = app.listen(8080);
ConnectWebSocket(server);

app.get("/",mainpage);

function ConnectWebSocket(server){
    connectWith(server);
}

function mainpage(req,res){
    res.sendFile(__dirname+"/doc/mainpage.html");
}