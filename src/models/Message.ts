// Message model (for chat)
export interface Message {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  type: 'text' | 'gift';
  giftType?: 'sound' | 'gif' | 'video';
  giftUrl?: string;
  createdAt: Date;
}
