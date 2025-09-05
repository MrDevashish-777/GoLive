import { Request, Response } from 'express';
// ...existing code...
export const sendMessage = (req: Request, res: Response) => {
  // TODO: Implement message sending logic
  res.status(201).json({ message: 'Message sent' });
};

export const getMessages = (req: Request, res: Response) => {
  // TODO: Implement fetching messages for a room
  res.status(200).json({ messages: [] });
};
