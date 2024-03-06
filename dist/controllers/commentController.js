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
exports.changeCommentStatus = exports.deleteComment = exports.getComments = exports.createComment = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, comment } = req.body;
        const { slug } = req.params;
        const blog = yield models_1.BlogModel.findOne({ slug });
        if (!blog) {
            throw (0, utils_1.errorResponse)(res, null, 'Blog not found', 404);
        }
        const newComment = new models_1.CommentModel({
            blog: blog._id,
            name,
            email,
            comment,
        });
        yield newComment.save();
        blog.comments.push(newComment._id);
        yield blog.save();
        return (0, utils_1.successResponse)(res, newComment, 'Comment created', 201);
    }
    catch (error) {
        return (0, utils_1.errorResponse)(res, error, 'Error creating comment', 500);
    }
});
exports.createComment = createComment;
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield models_1.CommentModel.find()
            .populate('blog', 'title slug -_id')
            .sort('-createdAt');
        return (0, utils_1.successResponse)(res, comments, 'Comments found', 200);
    }
    catch (error) {
        return (0, utils_1.errorResponse)(res, error, 'Error getting comments', 500);
    }
});
exports.getComments = getComments;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug, id } = req.params;
        const blog = yield models_1.BlogModel.findOne({ slug });
        if (!blog) {
            throw (0, utils_1.errorResponse)(res, null, 'Blog not found', 404);
        }
        const comment = yield models_1.CommentModel.findByIdAndDelete(id);
        if (!comment) {
            throw (0, utils_1.errorResponse)(res, null, 'Comment not found', 404);
        }
        blog.comments = blog.comments.filter((c) => c.toString() !== id);
        yield blog.save();
        return (0, utils_1.successResponse)(res, null, 'Comment deleted', 200);
    }
    catch (error) {
        return (0, utils_1.errorResponse)(res, error, 'Error deleting comment', 500);
    }
});
exports.deleteComment = deleteComment;
const changeCommentStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const comment = yield models_1.CommentModel.findByIdAndUpdate(id);
        if (!comment) {
            throw (0, utils_1.errorResponse)(res, null, 'Comment not found', 404);
        }
        comment.status = !comment.status;
        yield comment.save();
        return (0, utils_1.successResponse)(res, null, 'Comment status changed', 200);
    }
    catch (error) {
        return (0, utils_1.errorResponse)(res, error, 'Error changing comment status', 500);
    }
});
exports.changeCommentStatus = changeCommentStatus;
