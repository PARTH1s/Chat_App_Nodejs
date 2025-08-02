const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log("User Connected", socket.id);

    socket.on('msg_send',(data)=> {
        console.log(data);
        io.emit('msg_rcvd',data);
    })
})

const PORT = 3000
app.use('/', express.static(__dirname + '/public'));

server.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})