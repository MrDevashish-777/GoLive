// User model (for authentication)
export interface User {
  id: string;
  username: string;
  passwordHash: string;
  avatarUrl?: string;
  createdAt: Date;
}
