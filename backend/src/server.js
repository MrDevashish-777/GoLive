// Simple Express server to mint LiveKit access tokens securely
// Endpoints:
// - GET /health
// - POST /token { identity, roomName, [ttlSeconds] }

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { AccessToken } = require('livekit-server-sdk');
const { config } = require('./env');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: config.corsOrigin }));
app.use(morgan('dev'));

// Health
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', env: config.nodeEnv });
});

// Mint token for a user to join a room
app.post('/token', async (req, res) => {
  try {
    const { identity, roomName, ttlSeconds } = req.body || {};
    if (!identity || !roomName) {
      return res.status(400).json({ error: 'identity and roomName are required' });
    }

    const at = new AccessToken(config.livekitApiKey, config.livekitApiSecret, {
      identity: String(identity),
      // token TTL: default 1 hour if not provided
      ttl: typeof ttlSeconds === 'number' ? ttlSeconds : 3600,
    });

    // Grant permissions for the room
    at.addGrant({
      room: String(roomName),
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      // adjust as needed
      // canPublishData: true,
    });

    // In recent SDK versions, toJwt() is async
    const token = await at.toJwt();

    return res.json({ token, url: config.livekitUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'failed_to_create_token' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'not_found' });
});

// Start server
app.listen(config.port, () => {
  console.log(`Backend running on http://localhost:${config.port}`);
});