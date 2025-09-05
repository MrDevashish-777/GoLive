import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import env from './config';
import { errorHandler } from './middlewares/errorHandler';
import healthRoutes from './routes/health';
import tokenRoutes from './routes/token';
import { morganMiddleware } from './utils/logger';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import roomRoutes from './routes/room';
import messageRoutes from './routes/message';
import giftRoutes from './routes/gift';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: { origin: '*' } });

app.use(helmet());
app.use(express.json());
app.use(morganMiddleware);

// Allow comma-separated origins or "*" via FRONTEND_ORIGIN
const allowedOrigins = env.FRONTEND_ORIGIN.split(',').map((o: string) => o.trim());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow mobile/native with no origin
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
}));

app.use('/api', tokenRoutes);
app.use('/api', healthRoutes);

// API routes for live video app
app.use('/api/rooms', roomRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/gifts', giftRoutes);

app.use(errorHandler);

// Socket.IO for real-time chat and gifting
io.on('connection', (socket: any) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', (roomId: string) => {
    socket.join(roomId);
  });

  socket.on('chatMessage', (data: any) => {
    io.to(data.roomId).emit('chatMessage', data);
  });

  socket.on('sendGift', (data: any) => {
    io.to(data.roomId).emit('giftReceived', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start both HTTP and Socket.IO server
server.listen(env.PORT, env.NODE_IP, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://${env.NODE_IP}:${env.PORT}`);
});
