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
exports.getStatistics = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
const getStatistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield models_1.BlogModel.countDocuments();
        const comments = yield models_1.CommentModel.countDocuments();
        const likes = yield models_1.LikesModel.countDocuments();
        const users = yield models_1.UserModel.countDocuments();
        return (0, utils_1.successResponse)(res, { blogs, comments, likes, users }, 'Statistics found', 200);
    }
    catch (error) {
        return (0, utils_1.errorResponse)(res, error, 'Error getting statistics', 500);
    }
});
exports.getStatistics = getStatistics;
