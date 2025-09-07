import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

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
  const [token, setToken] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch token from backend
  useEffect(() => {
    const fetchToken = async () => {
      try {
        setIsConnecting(true);
        // In a real app, this would be a real API call
        // For now, we'll simulate a successful response
        console.log(`Would fetch token for room: ${roomName}, user: ${identity}, publisher: ${isPublisher}`);
        
        // Simulate API response
        setTimeout(() => {
          setToken("simulated-token");
          setIsConnecting(false);
          if (onConnected) onConnected();
        }, 1500);
      } catch (err) {
        console.error('Error fetching token:', err);
        setError('Failed to connect to the room. Please try again.');
        setIsConnecting(false);
      }
    };

    if (roomName && identity) {
      fetchToken();
    }

    // Cleanup function
    return () => {
    };
  }, [roomName, identity, isPublisher, onConnected, onDisconnected]);

  if (isConnecting) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E91E63" />
        <Text style={styles.loadingText}>Connecting to room...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isPublisher ? (
        <View style={styles.publisherContainer}>
          <Text style={styles.statusText}>Broadcasting as {identity}</Text>
        </View>
      ) : (
        <View style={styles.viewerContainer}>
          <Text style={styles.statusText}>Viewing as {identity}</Text>
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
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 20,
  },
  errorText: {
    color: '#E91E63',
    fontSize: 16,
    textAlign: 'center',
  },
  publisherContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  viewerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  statusText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});