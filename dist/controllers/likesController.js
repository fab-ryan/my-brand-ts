"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLikes = exports.createLike = void 0;
const models_1 = require("../models/");
const utils_1 = require("../utils");
const createLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { slug } = req.params;
        const blog = yield models_1.BlogModel.findOne({ slug });
        if (!blog) {
            return (0, utils_1.errorResponse)(res, null, 'Blog not found', 404);
        }
        const userAgent = req.headers['user-agent'];
        const os = userAgent === null || userAgent === void 0 ? void 0 : userAgent.split(/[()]/)[1];
        const browser = userAgent === null || userAgent === void 0 ? void 0 : userAgent.split(/[()]/)[3];
        console.log(os, browser, userAgent);
        const newLike = new models_1.LikesModel({
            blog: blog._id,
            os,
            browser,
        });
        yield newLike.save();
        (_a = blog.likes) === null || _a === void 0 ? void 0 : _a.push(newLike._id);
        yield blog.save();
        return (0, utils_1.successResponse)(res, newLike, 'Like created', 201);
    }
    catch (error) {
        const errorMessage = error.message;
        return (0, utils_1.errorResponse)(res, error, errorMessage, 500);
    }
});
exports.createLike = createLike;
const getLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likes = yield models_1.LikesModel.find().sort('-createdAt');
        return (0, utils_1.successResponse)(res, likes, 'Likes found', 200);
    }
    catch (error) {
        return (0, utils_1.errorResponse)(res, error, 'Error getting likes', 500);
    }
});
exports.getLikes = getLikes;
