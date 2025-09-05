"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var envalid_1 = require("envalid");
dotenv_1.default.config();
var env = (0, envalid_1.cleanEnv)(process.env, {
    API_KEY: (0, envalid_1.str)(),
    API_SECRET: (0, envalid_1.str)(),
    NODE_IP: (0, envalid_1.str)(),
    PORT: (0, envalid_1.port)(),
    FRONTEND_ORIGIN: (0, envalid_1.str)(),
});
exports.default = env;
