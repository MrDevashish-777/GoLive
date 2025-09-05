import { NextFunction, Request, Response } from 'express';
import { generateToken } from '../utils/tokenGenerator';

const identities = new Set<string>();

export function getToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { roomName, identity, isPublisher } = req.query;
    if (!roomName || !identity) {
      return res.status(400).json({ error: 'roomName and identity are required' });
    }
    if (identities.has(identity as string)) {
      return res.status(409).json({ error: 'Identity must be unique per user' });
    }
    identities.add(identity as string);
    const token = generateToken({
      roomName: roomName as string,
      identity: identity as string,
      isPublisher: isPublisher === 'true',
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
}
