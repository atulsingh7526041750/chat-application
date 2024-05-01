// messaging.js
const socketio = require('socket.io');
const http = require('http');

const server = http.createServer();
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('message', (msg) => {
    console.log('Message received:', msg);
    io.emit('message', msg);
  });
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

module.exports = server;
