"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomeScreen;
var vector_icons_1 = require("@expo/vector-icons");
var expo_router_1 = require("expo-router");
var react_1 = require("react");
var react_native_1 = require("react-native");
var gifts = [
    { id: 1, name: 'Rose', amount: 1, gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2NrbjZrdnJtYm55a3JtaGpoZ3A4d3k4c2s4c2pna2NpejV3eWJvdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c76IJLufpN5wA/giphy.gif' },
    { id: 2, name: 'Crown', amount: 100, gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2tqN2U5aHB1d2l3Z3hpdWJlb21sYnBsc3l6M3Y4d3ZpZ3NqZ3p2eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6gDWzmAzrpi5DQU8/giphy.gif' },
    { id: 3, name: 'Diamond', amount: 500, gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2tqN2U5aHB1d2l3Z3hpdWJlb21sYnBsc3l6M3Y4d3ZpZ3NqZ3p2eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6gDWzmAzrpi5DQU8/giphy.gif' },
    { id: 4, name: 'Gold Coin', amount: 10, gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2tqN2U5aHB1d2l3Z3hpdWJlb21sYnBsc3l6M3Y4d3ZpZ3NqZ3p2eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6gDWzmAzrpi5DQU8/giphy.gif' },
    { id: 5, name: 'Heart', amount: 5, gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2NrbjZrdnJtYm55a3JtaGpoZ3A4d3k4c2s4c2pna2NpejV3eWJvdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c76IJLufpN5wA/giphy.gif' },
];
var UserScreen = function () {
    var _a = (0, react_1.useState)(false), showGifts = _a[0], setShowGifts = _a[1];
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={styles.cameraView}/>

      <react_native_1.View style={styles.header}>
        <react_native_1.View style={styles.userInfo}>
          <react_native_1.Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.avatar}/>
          <react_native_1.View>
            <react_native_1.Text style={styles.username}>Streamer</react_native_1.Text>
            <react_native_1.Text style={styles.followers}>1.2M followers</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
        <react_native_1.TouchableOpacity style={styles.followButton}>
          <react_native_1.Text style={styles.followButtonText}>Follow</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>

      <react_native_1.View style={styles.liveChatContainer}>
        <react_native_1.ScrollView style={styles.liveChat}>
          <react_native_1.Text style={styles.chatMessage}><react_native_1.Text style={styles.chatUser}>User1:</react_native_1.Text> Hello!</react_native_1.Text>
          <react_native_1.Text style={styles.chatMessage}><react_native_1.Text style={styles.chatUser}>User2:</react_native_1.Text> Hi there!</react_native_1.Text>
        </react_native_1.ScrollView>
        <react_native_1.View style={styles.chatInputContainer}>
          <react_native_1.TextInput style={styles.chatInput} placeholder="Send a message..." placeholderTextColor="gray"/>
          <react_native_1.TouchableOpacity>
            <vector_icons_1.Ionicons name="send" size={24} color="white"/>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
      </react_native_1.View>

      <react_native_1.View style={styles.footer}>
        <react_native_1.TouchableOpacity onPress={function () { return setShowGifts(true); }} style={styles.iconButton}>
          <vector_icons_1.Ionicons name="gift" size={32} color="white"/>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>

      {showGifts && (<react_native_1.View style={styles.giftsPopup}>
          <react_native_1.TouchableOpacity onPress={function () { return setShowGifts(false); }} style={styles.closeButton}>
            <vector_icons_1.Ionicons name="close" size={28} color="white"/>
          </react_native_1.TouchableOpacity>
          <react_native_1.ScrollView contentContainerStyle={styles.giftsGrid}>
            {gifts.map(function (gift) { return (<react_native_1.View key={gift.id} style={styles.giftItem}>
                <react_native_1.Image source={{ uri: gift.gif }} style={styles.giftGif}/>
                <react_native_1.Text style={styles.giftName}>{gift.name}</react_native_1.Text>
                <react_native_1.Text style={styles.giftAmount}>{gift.amount}</react_native_1.Text>
              </react_native_1.View>); })}
          </react_native_1.ScrollView>
        </react_native_1.View>)}
    </react_native_1.View>);
};
var StreamerScreen = function () {
    var _a = (0, react_1.useState)(true), micOn = _a[0], setMicOn = _a[1];
    var _b = (0, react_1.useState)(true), cameraOn = _b[0], setCameraOn = _b[1];
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={styles.cameraView}/>

      <react_native_1.View style={styles.header}>
        <react_native_1.View style={styles.userInfo}>
          <react_native_1.Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.avatar}/>
          <react_native_1.View>
            <react_native_1.Text style={styles.username}>Streamer</react_native_1.Text>
            <react_native_1.Text style={styles.followers}>1.2M followers</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
        <react_native_1.TouchableOpacity style={styles.goLiveButton}>
          <react_native_1.Text style={styles.goLiveButtonText}>Go Live</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>

      <react_native_1.View style={styles.liveChatContainer}>
        <react_native_1.ScrollView style={styles.liveChat}>
          <react_native_1.Text style={styles.chatMessage}><react_native_1.Text style={styles.chatUser}>User1:</react_native_1.Text> Hello!</react_native_1.Text>
          <react_native_1.Text style={styles.chatMessage}><react_native_1.Text style={styles.chatUser}>User2:</react_native_1.Text> Hi there!</react_native_1.Text>
        </react_native_1.ScrollView>
      </react_native_1.View>

      <react_native_1.View style={styles.footer}>
        <react_native_1.TouchableOpacity onPress={function () { return setMicOn(!micOn); }} style={styles.iconButton}>
          <vector_icons_1.Ionicons name={micOn ? 'mic' : 'mic-off'} size={32} color={micOn ? 'white' : 'red'}/>
        </react_native_1.TouchableOpacity>
        <react_native_1.TouchableOpacity onPress={function () { return setCameraOn(!cameraOn); }} style={styles.iconButton}>
          <vector_icons_1.Ionicons name={cameraOn ? 'videocam' : 'videocam-off'} size={32} color={cameraOn ? 'white' : 'red'}/>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.View>);
};
function HomeScreen() {
    var role = (0, expo_router_1.useLocalSearchParams)().role;
    if (role === 'streamer') {
        return <StreamerScreen />;
    }
    return <UserScreen />;
}
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    cameraView: __assign(__assign({}, react_native_1.StyleSheet.absoluteFillObject), { backgroundColor: '#333' }),
    header: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    },
    liveChat: {
        flex: 1,
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
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
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
