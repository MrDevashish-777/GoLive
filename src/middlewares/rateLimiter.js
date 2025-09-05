"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRateLimiter = void 0;
var express_rate_limit_1 = require("express-rate-limit");
exports.tokenRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // limit each IP to 10 requests per windowMs
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
