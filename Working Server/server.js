const express = require('express');
const server = express();
const httpServer = require('http').Server(server);
const client = require('socket.io')(httpServer);

var messages = [];

server.use(express.static('.'));
server.get('/', function(req,res){
    res.redirect('index.html');
});
httpServer.listen(3000);

client.on('connection', function(socket){
    for(var i in messages){
        client.sockets.emit('display message', messages[i])
    }
    socket.on('send message', function(data){
        messages.push(data);
        client.sockets.emit('display message', data)
    });
});
