import { io, Socket } from 'socket.io-client';
import appConfig from '@/config/appConfig';

// Types for messages and gifts
export interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  username: string;
  message: string;
  timestamp: number;
}

export interface Gift {
  id: string;
  roomId: string;
  userId: string;
  username: string;
  giftId: number;
  giftName: string;
  amount: number;
  timestamp: number;
}

class SocketService {
  private socket: Socket | null = null;
  private listeners: { [event: string]: Function[] } = {};

  // Connect to the socket server
  connect(userId: string, username: string) {
    this.socket = io(appConfig.socket.url, {
      query: {
        userId,
        username
      }
    });

    // Set up default listeners
    this.socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    // Set up listeners for chat messages and gifts
    this.socket.on('chatMessage', (message: ChatMessage) => {
      this.triggerEvent('chatMessage', message);
    });

    this.socket.on('giftReceived', (gift: Gift) => {
      this.triggerEvent('giftReceived', gift);
    });
  }

  // Disconnect from the socket server
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Join a room
  joinRoom(roomId: string) {
    if (this.socket) {
      this.socket.emit('joinRoom', roomId);
    }
  }

  // Leave a room
  leaveRoom(roomId: string) {
    if (this.socket) {
      this.socket.emit('leaveRoom', roomId);
    }
  }

  // Send a chat message
  sendMessage(roomId: string, message: string) {
    if (this.socket) {
      this.socket.emit('chatMessage', { roomId, message });
    }
  }

  // Send a gift
  sendGift(roomId: string, giftId: number) {
    if (this.socket) {
      this.socket.emit('sendGift', { roomId, giftId });
    }
  }

  // Add an event listener
  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  // Remove an event listener
  off(event: string, callback: Function) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  // Trigger an event
  private triggerEvent(event: string, ...args: any[]) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => {
        callback(...args);
      });
    }
  }
}

// Export a singleton instance
export default new SocketService();