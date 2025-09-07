// App configuration
const appConfig = {
  // API endpoints
  api: {
    baseUrl: 'http://localhost:3001', // Use process.env.API_BASE_URL in a real app
    endpoints: {
      token: '/api/getToken',
      rooms: '/api/rooms',
      messages: '/api/messages',
      gifts: '/api/gifts',
    }
  },
  
  // LiveKit configuration
  livekit: {
    // Convert the HTTP URL to WebSocket URL for LiveKit
    serverUrl: 'ws://127.0.0.1:7880', // Using the LIVEKIT_URL from .env
  },
  
  // Socket.io configuration
  socket: {
    url: 'http://localhost:3001', // Use process.env.SOCKET_URL in a real app
  },
  
  // Gift configuration
  gifts: {
    defaultAmount: 10,
    currency: 'coins',
  }
};

export default appConfig;