"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProfileScreen;
var expo_router_1 = require("expo-router");
var react_1 = require("react");
var react_native_1 = require("react-native");
function ProfileScreen() {
    var router = (0, expo_router_1.useRouter)();
    var handleLogout = function () {
        // Replace the current route so user can't go back to tabs
        router.replace('/login');
    };
    return (<react_native_1.View style={styles.container}>
      <react_native_1.Text style={styles.title}>Profile</react_native_1.Text>

      <react_native_1.TouchableOpacity style={styles.button} onPress={handleLogout}>
        <react_native_1.Text style={styles.buttonText}>Logout</react_native_1.Text>
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
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 24,
    },
    button: {
        width: '80%',
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
