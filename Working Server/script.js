window.onload = function () {
    var socket = io();
    var chatDiv = document.getElementById('chat');
    var input = document.getElementById('message');
    var button = document.getElementById('submit');
    button.onclick = function (evt) {
        var val = input.value;
        socket.emit('send message', val);
    }
    socket.on('display message', function (msg) {
        var p = document.createElement('p');
        p.innerText = msg;
        chatDiv.appendChild(p);
        input.value = '';
    });
}