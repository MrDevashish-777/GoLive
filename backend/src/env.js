// Environment loader and validation
// Loads variables from .env and verifies required ones are present

const dotenv = require('dotenv');
dotenv.config();

function requireEnv(name, fallback = undefined) {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  livekitUrl: requireEnv('LIVEKIT_URL', 'http://127.0.0.1:7880'),
  livekitApiKey: requireEnv('LIVEKIT_API_KEY'),
  livekitApiSecret: requireEnv('LIVEKIT_API_SECRET'),
};

module.exports = { config };