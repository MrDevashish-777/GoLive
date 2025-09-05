"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginScreen;
var expo_router_1 = require("expo-router");
var react_1 = require("react");
var react_native_1 = require("react-native");
function LoginScreen() {
    var _a = (0, react_1.useState)(''), email = _a[0], setEmail = _a[1];
    var _b = (0, react_1.useState)(''), password = _b[0], setPassword = _b[1];
    var router = (0, expo_router_1.useRouter)();
    var handleLogin = function () {
        if ((email === 'streamer@gmail.com' || email === 'user@gmail.com') && password) {
            router.replace({ pathname: '/(tabs)', params: { role: email === 'streamer@gmail.com' ? 'streamer' : 'user' } });
        }
        else {
            alert('Invalid credentials');
        }
    };
    return (<react_native_1.View style={styles.container}>
      <react_native_1.Text style={styles.title}>Login</react_native_1.Text>
      <react_native_1.TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
      <react_native_1.TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
      <react_native_1.TouchableOpacity style={styles.button} onPress={handleLogin}>
        <react_native_1.Text style={styles.buttonText}>Login</react_native_1.Text>
      </react_native_1.TouchableOpacity>
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 40,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#333',
        borderRadius: 10,
        paddingHorizontal: 15,
        color: 'white',
        marginBottom: 20,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#E91E63',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
