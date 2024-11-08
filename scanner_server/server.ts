import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();
const port = 3001;

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected: ', socket.id);

  socket.on('join_room', (data) => {
    socket.join(data);
  });

  socket.on('send_message', (data) => {
    console.log(data);
    // socket.broadcast.emit('receive_message', data);
    // socket.emit('receive_message', data);
    io.emit('receive_message', data);
  });

  socket.on('scan', (data) => {
    console.log('Scan data received:', data);
    io.emit('scan', data); // Emit to all clients
  });

  socket.on('disconnect', () => {
    console.log('user disconnected: ', socket.id);
  });
});

app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
