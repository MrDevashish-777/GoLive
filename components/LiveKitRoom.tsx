import appConfig from '@/config/appConfig';
import { Room, RoomEvent, VideoView, createLocalAudioTrack, createLocalVideoTrack } from '@livekit/react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';

interface LiveKitRoomProps {
  roomName: string;
  identity: string;
  isPublisher: boolean;
  onConnected?: () => void;
  onDisconnected?: () => void;
}

export default function LiveKitRoom({ 
  roomName, 
  identity, 
  isPublisher, 
  onConnected, 
  onDisconnected 
}: LiveKitRoomProps) {
  const [room, setRoom] = useState<Room | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Fetch token from backend
  useEffect(() => {
    const fetchToken = async () => {
      try {
        setIsConnecting(true);
        const url = `${appConfig.api.baseUrl}${appConfig.api.endpoints.token}?roomName=${roomName}&identity=${identity}&isPublisher=${isPublisher}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to get token');
        }
        
        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.error('Error fetching token:', error);
        Alert.alert('Connection Error', 'Failed to connect to the room. Please try again.');
      } finally {
        setIsConnecting(false);
      }
    };

    if (roomName && identity) {
      fetchToken();
    }
  }, [roomName, identity, isPublisher]);

  // Connect to room when token is available
  useEffect(() => {
    if (!token) return;

    const connectToRoom = async () => {
      try {
        // Create a new room
        const newRoom = new Room();
        
        // Set up event listeners
        newRoom.on(RoomEvent.Connected, () => {
          console.log('Connected to room');
          setIsConnected(true);
          if (onConnected) onConnected();
        });
        
        newRoom.on(RoomEvent.Disconnected, () => {
          console.log('Disconnected from room');
          setIsConnected(false);
          if (onDisconnected) onDisconnected();
        });
        
        // Connect to the room
        await newRoom.connect(appConfig.livekit.serverUrl, token);
        setRoom(newRoom);
        
        // If this user is a publisher, publish audio and video
        if (isPublisher) {
          try {
            const audioTrack = await createLocalAudioTrack();
            const videoTrack = await createLocalVideoTrack();
            
            await newRoom.localParticipant.publishTrack(audioTrack);
            await newRoom.localParticipant.publishTrack(videoTrack);
          } catch (error) {
            console.error('Error publishing tracks:', error);
            Alert.alert('Media Error', 'Failed to publish audio/video. Please check permissions.');
          }
        }
      } catch (error) {
        console.error('Error connecting to room:', error);
        Alert.alert('Connection Error', 'Failed to connect to the room. Please try again.');
      }
    };

    connectToRoom();

    // Cleanup function
    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, [token, isPublisher, onConnected, onDisconnected]);

  if (isConnecting) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E91E63" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {room && isConnected ? (
        <View style={styles.videoContainer}>
          {/* Display local participant's video if publisher */}
          {isPublisher && room.localParticipant.videoTracks.size > 0 && (
            <VideoView
              style={styles.localVideo}
              videoTrack={Array.from(room.localParticipant.videoTracks.values())[0]}
            />
          )}
          
          {/* Display remote participants' videos */}
          {Array.from(room.remoteParticipants.values()).map((participant) => {
            const videoTrack = Array.from(participant.videoTracks.values())[0];
            if (!videoTrack) return null;
            
            return (
              <VideoView
                key={participant.sid}
                style={styles.remoteVideo}
                videoTrack={videoTrack}
              />
            );
          })}
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          {/* Placeholder when not connected */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  localVideo: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 120,
    height: 160,
    borderRadius: 10,
    zIndex: 10,
  },
  remoteVideo: {
    flex: 1,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
});