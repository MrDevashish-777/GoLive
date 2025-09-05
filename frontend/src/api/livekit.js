import axios from 'axios';

export async function fetchLiveKitToken(userId, roomName, role = 'viewer') {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/livekit/token`, {
    userId,
    roomName,
    role,
  });
  return res.data.token;
}
