"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganMiddleware = void 0;
var morgan_1 = require("morgan");
var winston_1 = require("winston");
var logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.Console(),
    ],
});
exports.morganMiddleware = (0, morgan_1.default)('combined', {
    stream: {
        write: function (message) { return logger.info(message.trim()); },
    },
});
exports.default = logger;
