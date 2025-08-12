const mongoose = require('mongoose');

// Chat schema to store messages between two users in a room
const chatSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,       
    },
    user1: {
        type: String,
        required: true,       
    },
    user2: {
        type: String,
        required: true,        
    },
    roomId: {
        type: String,
        required: true,        
    }
}, { timestamps: true });      

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
