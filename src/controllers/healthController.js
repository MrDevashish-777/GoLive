"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.health = health;
function health(req, res) {
    res.status(200).json({ status: 'ok' });
}
