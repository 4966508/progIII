const express = require('express');
const server = express();
const httpServer = require('http').Server(server);
const io = require('socket.io')(httpServer);

var messages = [];

server.use(express.static('.'));
server.get('/', function(req,res){
    res.redirect('index.html');
});
httpServer.listen(3000);

io.on('connection', function(socket){
    for(var i in messages){
        io.sockets.emit('display message', messages[i]);
    }
    socket.on('send message', function(data){
        messages.push(data);
        io.sockets.emit('display message', data);
    });
});
