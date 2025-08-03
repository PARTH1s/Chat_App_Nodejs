const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const connect = require('./config/database-config');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log("User Connected:", socket.id);

    socket.on('join_room', (roomid) => {
        socket.join(roomid);
        console.log(`Socket ${socket.id} joined room ${roomid}`);
    });

    socket.on('msg_send', (data) => {
        io.to(data.roomid).emit('msg_rcvd', {
            msg: data.msg,
            username: data.username
        });
    });

    socket.on('typing', (data) => {
        socket.to(data.roomid).emit('user_typing', { username: data.username });
    });

    socket.on('stop_typing', (data) => {
        socket.to(data.roomid).emit('user_stop_typing', { username: data.username });
    });
});


const PORT = 3000;
app.use('/', express.static(__dirname + '/public'));

app.set('view engine','ejs');

app.get('/chat/:roomid',(req,res)=>{
    res.render('index',{
        roomid: req.params.roomid
    });
});

server.listen(PORT, async () => {
    console.log(`Server started at ${PORT}`);
    await connect();
});
