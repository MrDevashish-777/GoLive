import { Request, Response } from 'express';
// ...existing code...
export const createRoom = (req: Request, res: Response) => {
  // TODO: Implement room creation logic
  res.status(201).json({ message: 'Room created' });
};

export const endRoom = (req: Request, res: Response) => {
  // TODO: Implement room ending logic
  res.status(200).json({ message: 'Room ended' });
};

export const getLiveRooms = (req: Request, res: Response) => {
  // TODO: Implement fetching live rooms
  res.status(200).json({ rooms: [] });
};
