// Room model (for live video sessions)
export interface Room {
  id: string;
  hostId: string;
  title: string;
  isLive: boolean;
  createdAt: Date;
  endedAt?: Date;
}
