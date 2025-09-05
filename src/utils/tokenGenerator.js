"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
var livekit_server_sdk_1 = require("livekit-server-sdk");
var config_1 = require("../config");
function generateToken(_a) {
    var roomName = _a.roomName, identity = _a.identity, isPublisher = _a.isPublisher;
    var at = new livekit_server_sdk_1.AccessToken(config_1.default.API_KEY, config_1.default.API_SECRET, {
        identity: identity,
        ttl: 60 * 5, // 5 minutes
    });
    at.addGrant({
        room: roomName,
        roomJoin: true,
        canPublish: isPublisher,
        canSubscribe: true,
    });
    return at.toJwt();
}
