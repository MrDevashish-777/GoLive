"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var helmet_1 = require("helmet");
var cors_1 = require("cors");
var config_1 = require("./config");
var token_1 = require("./routes/token");
var health_1 = require("./routes/health");
var errorHandler_1 = require("./middlewares/errorHandler");
var logger_1 = require("./utils/logger");
var app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(logger_1.morganMiddleware);
app.use((0, cors_1.default)({
    origin: config_1.default.FRONTEND_ORIGIN,
    credentials: true,
}));
app.use('/api', token_1.default);
app.use('/api', health_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(config_1.default.PORT, config_1.default.NODE_IP, function () {
    // eslint-disable-next-line no-console
    console.log("Server running on https://".concat(config_1.default.NODE_IP, ":").concat(config_1.default.PORT));
});
