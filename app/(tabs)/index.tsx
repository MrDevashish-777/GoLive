import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import LiveKitRoom from '@/components/LiveKitRoom';
import socketService, { ChatMessage, Gift } from '@/services/socketService';

const gifts = [
  { id: 1, name: 'Rose', amount: 1, gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2NrbjZrdnJtYm55a3JtaGpoZ3A4d3k4c2s4c2pna2NpejV3eWJvdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c76IJLufpN5wA/giphy.gif' },
  { id: 2, name: 'Crown', amount: 100, gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2tqN2U5aHB1d2l3Z3hpdWJlb21sYnBsc3l6M3Y4d3ZpZ3NqZ3p2eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6gDWzmAzrpi5DQU8/giphy.gif' },
  { id: 3, name: 'Diamond', amount: 500, gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2tqN2U5aHB1d2l3Z3hpdWJlb21sYnBsc3l6M3Y4d3ZpZ3NqZ3p2eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6gDWzmAzrpi5DQU8/giphy.gif' },
  { id: 4, name: 'Gold Coin', amount: 10, gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2tqN2U5aHB1d2l3Z3hpdWJlb21sYnBsc3l6M3Y4d3ZpZ3NqZ3p2eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6gDWzmAzrpi5DQU8/giphy.gif' },
  { id: 5, name: 'Heart', amount: 5, gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2NrbjZrdnJtYm55a3JtaGpoZ3A4d3k4c2s4c2pna2NpejV3eWJvdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c76IJLufpN5wA/giphy.gif' },
];

const UserScreen = () => {
  const [showGifts, setShowGifts] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [receivedGifts, setReceivedGifts] = useState<Gift[]>([]);
  const [roomConnected, setRoomConnected] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Current room and user info - in a real app, this would come from auth/state
  const roomId = 'main-room';
  const userId = 'user-123';
  const username = 'Viewer';
  
  // Connect to socket when component mounts
  useEffect(() => {
    socketService.connect(userId, username);
    socketService.joinRoom(roomId);
    
    // Set up message listener
    socketService.on('chatMessage', (newMessage: ChatMessage) => {
      setMessages(prev => [...prev, newMessage]);
      // Scroll to bottom when new message arrives
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });
    
    // Set up gift listener
    socketService.on('giftReceived', (gift: Gift) => {
      setReceivedGifts(prev => [...prev, gift]);
      // Show gift animation (in a real app)
      Alert.alert('Gift Received', `${gift.username} sent a ${gift.giftName}!`);
    });
    
    // Cleanup on unmount
    return () => {
      socketService.leaveRoom(roomId);
      socketService.disconnect();
    };
  }, []);
  
  // Send a message
  const sendMessage = () => {
    if (!message.trim()) return;
    
    socketService.sendMessage(roomId, message);
    setMessage('');
  };
  
  // Send a gift
  const sendGift = (giftId: number) => {
    socketService.sendGift(roomId, giftId);
    setShowGifts(false);
  };

  return (
    <View style={styles.container}>
      {/* LiveKit Room for video streaming */}
      <LiveKitRoom 
        roomName={roomId}
        identity={userId}
        isPublisher={false}
        onConnected={() => setRoomConnected(true)}
        onDisconnected={() => setRoomConnected(false)}
      />

      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.avatar} />
          <View>
            <Text style={styles.username}>Streamer</Text>
            <Text style={styles.followers}>1.2M followers</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.liveChatContainer}>
        <ScrollView 
          ref={scrollViewRef}
          style={styles.liveChat}
          contentContainerStyle={styles.chatContent}
        >
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <Text key={index} style={styles.chatMessage}>
                <Text style={styles.chatUser}>{msg.username}:</Text> {msg.message}
              </Text>
            ))
          ) : (
            <>
              <Text style={styles.chatMessage}><Text style={styles.chatUser}>User1:</Text> Hello!</Text>
              <Text style={styles.chatMessage}><Text style={styles.chatUser}>User2:</Text> Hi there!</Text>
            </>
          )}
        </ScrollView>
        <View style={styles.chatInputContainer}>
          <TextInput 
            style={styles.chatInput} 
            placeholder="Send a message..." 
            placeholderTextColor="gray"
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity onPress={sendMessage}>
            <IconSymbol name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setShowGifts(true)} style={styles.iconButton}>
          <IconSymbol name="gift" size={32} color="white" />
        </TouchableOpacity>
      </View>

      {showGifts && (
        <View style={styles.giftsPopup}>
          <TouchableOpacity onPress={() => setShowGifts(false)} style={styles.closeButton}>
            <IconSymbol name="close" size={28} color="white" />
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.giftsGrid}>
            {gifts.map((gift) => (
              <TouchableOpacity 
                key={gift.id} 
                style={styles.giftItem}
                onPress={() => sendGift(gift.id)}
              >
                <Image source={{ uri: gift.gif }} style={styles.giftGif} />
                <Text style={styles.giftName}>{gift.name}</Text>
                <Text style={styles.giftAmount}>{gift.amount}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const StreamerScreen = () => {
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [receivedGifts, setReceivedGifts] = useState<Gift[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Current room and user info - in a real app, this would come from auth/state
  const roomId = 'main-room';
  const userId = 'streamer-123';
  const username = 'Streamer';
  
  // Connect to socket when component mounts
  useEffect(() => {
    socketService.connect(userId, username);
    socketService.joinRoom(roomId);
    
    // Set up message listener
    socketService.on('chatMessage', (newMessage: ChatMessage) => {
      setMessages(prev => [...prev, newMessage]);
      // Scroll to bottom when new message arrives
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });
    
    // Set up gift listener
    socketService.on('giftReceived', (gift: Gift) => {
      setReceivedGifts(prev => [...prev, gift]);
      // Show gift animation (in a real app)
      Alert.alert('Gift Received', `${gift.username} sent a ${gift.giftName}!`);
    });
    
    // Cleanup on unmount
    return () => {
      socketService.leaveRoom(roomId);
      socketService.disconnect();
    };
  }, []);
  
  // Toggle live status
  const toggleLiveStatus = () => {
    setIsLive(!isLive);
  };

  return (
    <View style={styles.container}>
      {/* LiveKit Room for broadcasting */}
      {isLive && (
        <LiveKitRoom 
          roomName={roomId}
          identity={userId}
          isPublisher={true}
          onConnected={() => console.log('Connected to LiveKit room')}
          onDisconnected={() => {
            console.log('Disconnected from LiveKit room');
            setIsLive(false);
          }}
        />
      )}
      
      {!isLive && <View style={styles.cameraView} />}

      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.avatar} />
          <View>
            <Text style={styles.username}>Streamer</Text>
            <Text style={styles.followers}>1.2M followers</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={[styles.goLiveButton, isLive && styles.endLiveButton]}
          onPress={toggleLiveStatus}
        >
          <Text style={styles.goLiveButtonText}>
            {isLive ? 'End Stream' : 'Go Live'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.liveChatContainer}>
        <ScrollView 
          ref={scrollViewRef}
          style={styles.liveChat}
          contentContainerStyle={styles.chatContent}
        >
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <Text key={index} style={styles.chatMessage}>
                <Text style={styles.chatUser}>{msg.username}:</Text> {msg.message}
              </Text>
            ))
          ) : (
            <>
              <Text style={styles.chatMessage}><Text style={styles.chatUser}>User1:</Text> Hello!</Text>
              <Text style={styles.chatMessage}><Text style={styles.chatUser}>User2:</Text> Hi there!</Text>
            </>
          )}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          onPress={() => setMicOn(!micOn)} 
          style={styles.iconButton}
          disabled={!isLive}
        >
          <IconSymbol 
            name={micOn ? 'mic' : 'mic-off'} 
            size={32} 
            color={!isLive ? 'gray' : (micOn ? 'white' : 'red')} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setCameraOn(!cameraOn)} 
          style={styles.iconButton}
          disabled={!isLive}
        >
          <IconSymbol 
            name={cameraOn ? 'videocam' : 'videocam-off'} 
            size={32} 
            color={!isLive ? 'gray' : (cameraOn ? 'white' : 'red')} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const { role } = useLocalSearchParams();

  if (role === 'streamer') {
    return <StreamerScreen />;
  }

  return <UserScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  cameraView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#333',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#E91E63',
  },
  username: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  followers: {
    color: 'gray',
    fontSize: 14,
  },
  followButton: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  goLiveButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  endLiveButton: {
    backgroundColor: '#F44336',
  },
  goLiveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  liveChatContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    height: 250,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 10,
    zIndex: 5,
  },
  liveChat: {
    flex: 1,
  },
  chatContent: {
    paddingBottom: 10,
  },
  chatMessage: {
    color: 'white',
    marginBottom: 10,
  },
  chatUser: {
    fontWeight: 'bold',
    color: '#E91E63',
    marginRight: 5,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'gray',
    paddingTop: 10,
  },
  chatInput: {
    flex: 1,
    color: 'white',
    height: 40,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  iconButton: {
    marginHorizontal: 20,
    padding: 10,
  },
  giftsPopup: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    zIndex: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 25,
  },
  giftsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 40,
  },
  giftItem: {
    alignItems: 'center',
    margin: 15,
  },
  giftGif: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  giftName: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  giftAmount: {
    color: 'gold',
    fontSize: 14,
  },
});
