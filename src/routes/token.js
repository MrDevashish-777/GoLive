"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tokenController_1 = require("../controllers/tokenController");
var rateLimiter_1 = require("../middlewares/rateLimiter");
var router = (0, express_1.Router)();
router.get('/getToken', rateLimiter_1.tokenRateLimiter, tokenController_1.getToken);
exports.default = router;
