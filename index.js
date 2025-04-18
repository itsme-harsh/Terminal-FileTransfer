import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.on('join', (room) => {
    socket.join(room);
    socket.to(room).emit('peer-connected');
  });

  socket.on('chat-message', ({ chatRoom, message }) => {
    socket.to(chatRoom).emit('chat-message', message);
  });  

  socket.on('signal', ({ room, data }) => {
    socket.to(room).emit('signal', data);
  });
});

httpServer.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
