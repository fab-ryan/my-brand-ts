"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuthenticated = void 0;
const passport_1 = __importDefault(require("passport"));
const utils_1 = require("../utils");
const isAuthenticated = (req, res, next) => {
    passport_1.default.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            return (0, utils_1.errorResponse)(res, null, 'Unauthorized', 401);
        }
        req.user = user;
        return next();
    })(req, res, next);
};
exports.isAuthenticated = isAuthenticated;
const isAdmin = (req, res, next) => {
    const user = req.user;
    if ((user === null || user === void 0 ? void 0 : user.role) !== 'admin') {
        return (0, utils_1.errorResponse)(res, null, 'Unauthorized', 401);
    }
    return next();
};
exports.isAdmin = isAdmin;
