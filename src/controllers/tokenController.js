"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = getToken;
var tokenGenerator_1 = require("../utils/tokenGenerator");
var identities = new Set();
function getToken(req, res, next) {
    try {
        var _a = req.query, roomName = _a.roomName, identity = _a.identity, isPublisher = _a.isPublisher;
        if (!roomName || !identity) {
            return res.status(400).json({ error: 'roomName and identity are required' });
        }
        if (identities.has(identity)) {
            return res.status(409).json({ error: 'Identity must be unique per user' });
        }
        identities.add(identity);
        var token = (0, tokenGenerator_1.generateToken)({
            roomName: roomName,
            identity: identity,
            isPublisher: isPublisher === 'true',
        });
        res.json({ token: token });
    }
    catch (err) {
        next(err);
    }
}
