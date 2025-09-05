import dotenv from 'dotenv';
import { cleanEnv, port, str } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
  API_KEY: str(),
  API_SECRET: str(),
  NODE_IP: str(),
  PORT: port(),
  FRONTEND_ORIGIN: str(),
});

export default env;
