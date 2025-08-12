const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const connect = require('./config/database-config');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Handle new socket connections
io.on('connection', (socket) => {
    console.log("User Connected:", socket.id);

    // Join a chat room
    socket.on('join_room', (roomid) => {
        socket.join(roomid);
        console.log(`Socket ${socket.id} joined room ${roomid}`);
    });

    // Broadcast a message to the room
    socket.on('msg_send', (data) => {
        io.to(data.roomid).emit('msg_rcvd', {
            msg: data.msg,
            username: data.username
        });
    });

    // Notify others when user is typing
    socket.on('typing', (data) => {
        socket.to(data.roomid).emit('user_typing', { username: data.username });
    });

    // Notify others when user stops typing
    socket.on('stop_typing', (data) => {
        socket.to(data.roomid).emit('user_stop_typing', { username: data.username });
    });
});

const PORT = 3000;

// Serve static files from 'public' directory
app.use('/', express.static(__dirname + '/public'));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Render chat page for given room id
app.get('/chat/:roomid', (req, res) => {
    res.render('index', {
        roomid: req.params.roomid
    });
});

// Start server and connect to database
server.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`);
    await connect();
});
