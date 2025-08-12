const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost/chatapp");
    console.log('Mongoose connected');
  } catch (error) {
    console.error('Mongoose connection error:', error);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connect;
