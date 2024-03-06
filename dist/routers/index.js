"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("../utils");
const blogRouter_1 = __importDefault(require("./blogRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const authRouter_1 = __importDefault(require("./authRouter"));
const queryRouter_1 = __importDefault(require("./queryRouter"));
const commentRouter_1 = __importDefault(require("./commentRouter"));
const likesRouter_1 = __importDefault(require("./likesRouter"));
const categoryRouter_1 = __importDefault(require("./categoryRouter"));
const projectRouter_1 = __importDefault(require("./projectRouter"));
const educationRouter_1 = __importDefault(require("./educationRouter"));
const skillsRouter_1 = __importDefault(require("./skillsRouter"));
const router = (0, express_1.Router)();
const routes = [
    blogRouter_1.default,
    userRouter_1.default,
    authRouter_1.default,
    queryRouter_1.default,
    commentRouter_1.default,
    likesRouter_1.default,
    categoryRouter_1.default,
    projectRouter_1.default,
    educationRouter_1.default,
    skillsRouter_1.default,
];
router.use('/api', routes);
router.get('/', (req, res) => {
    (0, utils_1.successResponse)(res, 'Welcome to the API!👋🏽👋🏽');
});
router.use((req, res) => {
    (0, utils_1.errorResponse)(res, null, 'Route not found', 404);
});
router.use((err, req, res, next) => {
    console.error(err.stack);
    (0, utils_1.errorResponse)(res, null, err.message, 500);
});
exports.default = router;
