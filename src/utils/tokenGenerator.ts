import { AccessToken } from 'livekit-server-sdk';
import env from '../config';

export function generateToken({ roomName, identity, isPublisher }: { roomName: string; identity: string; isPublisher: boolean; }) {
  const at = new AccessToken(env.API_KEY, env.API_SECRET, {
    identity,
    ttl: 60 * 5, // 5 minutes
  });
  at.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: isPublisher,
    canSubscribe: true,
  });
  return at.toJwt();
}
