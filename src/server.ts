import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import env from './config';
import { errorHandler } from './middlewares/errorHandler';
import healthRoutes from './routes/health';
import tokenRoutes from './routes/token';
import { morganMiddleware } from './utils/logger';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morganMiddleware);

// Allow comma-separated origins or "*" via FRONTEND_ORIGIN
const allowedOrigins = env.FRONTEND_ORIGIN.split(',').map((o) => o.trim());
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

app.use(errorHandler);

app.listen(env.PORT, env.NODE_IP, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://${env.NODE_IP}:${env.PORT}`);
});
