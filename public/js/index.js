$(document).ready(function(){
    let port = 3000;
    let socket = io.connect('http://localhost:', + port)

    $('#chatForm').submit(function(e){
        e.preventDefault();
        socket.emit('chat_message',$('#txt').val());
        return false;

    });
    socket.on('is_online',function(username){
        $('#messages').append($('<li>')).html(username);
    });
    socket.on('chat_message',function(msg){
        $('#messages').append($('<li>')).html(msg);
    });

    let username = window.prompt('Please tell me your name: ');
    socket.emit('username', username)
})