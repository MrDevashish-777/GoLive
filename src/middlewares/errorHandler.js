"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
var logger_1 = require("../utils/logger");
function errorHandler(err, req, res, next) {
    logger_1.default.error(err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
}
