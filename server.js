const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000;
app.set('view engine','ejs');
app.use(express.static('public'))

io.sockets.on('connection',function(socket){
    socket.on('username',function(username){
        socket.username = username;
        io.emit('is_online','&#128512;<strong>' + socket.username + 'Joined the chat</strong>');
    })
    socket.on('disconnect',function(username){
        socket.username = username;
        io.emit('is_online','&#1f535;<strong>' + socket.username + 'left the chatt</strong>');
    })
    socket.on('chat_message',function(message){
        io.emit('chat_message','&#1f535;<strong>' + socket.username + '</strong>:'+ message);
    })
    
})



const server = http.listen(port, function(){
    console.log(`listening on ${port}`)
})
app.get('/', function(req,res){
    res.render('index.ejs');
})
