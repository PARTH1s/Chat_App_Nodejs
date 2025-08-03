var socket = io();

// btn.onclick = function exec() {
    //     socket.emit('from_client');
// }


// socket.on('from_server', () => {  
//     console.log("Collected a new event from server");
//     const div = document.createElement('div');
//     div.innerChild = 'New event from server';  
//     document.body.appendChild(div);
// });

let btn = document.getElementById('btn');
let inputmsg = document.getElementById('newmsg');
let msglist=document.getElementById('msglist');

btn.onclick = function exec(){
    socket.emit('msg_send',{
        msg: inputmsg.value
     });
}

socket.on('msg_rcvd',(data)=>{
    let limsg = document.createElement('li');
    limsg.innerText = data.msg;
    msglist.appendChild(limsg);
})