const socket = io();

const btn = document.getElementById('btn');
const inputMsg = document.getElementById('newmsg');
const msgList = document.getElementById('msglist');

// Send message to server on button click
btn.onclick = () => {
    if (inputMsg.value.trim()) {
        socket.emit('msg_send', {
            msg: inputMsg.value.trim()
        });
        inputMsg.value = '';  
    }
};

// Listen for messages from server and append to message list
socket.on('msg_rcvd', (data) => {
    const liMsg = document.createElement('li');
    liMsg.innerText = data.msg;
    msgList.appendChild(liMsg);
});
