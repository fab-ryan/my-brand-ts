"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post('/blogs/:slug/like', controllers_1.createLike);
router.get('/blogs/:slug/like', middlewares_1.isAuthenticated, middlewares_1.isAdmin, controllers_1.getLikes);
exports.default = router;
