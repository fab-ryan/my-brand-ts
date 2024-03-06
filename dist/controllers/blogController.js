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
exports.BlogController = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
class BlogController {
    // getting all Blogs
    getBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield models_1.BlogModel.find();
                (0, utils_1.successResponse)(res, blogs, 'Blogs fetched successfully', 200);
            }
            catch (error) {
                const errorMessage = 'Error getting blogs';
                (0, utils_1.errorResponse)(res, null, errorMessage, 500);
            }
        });
    }
    // creating a Blog
    createBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.file) {
                    req.body.image = yield (0, utils_1.fileUpload)(req, 'blog');
                }
                const slug = yield (0, utils_1.generateSlug)(req.body.title, models_1.BlogModel);
                const blog = yield models_1.BlogModel.create(Object.assign(Object.assign({}, req.body), { slug, createdAt: new Date() }));
                (0, utils_1.successResponse)(res, blog, 'Blog created successfully', 201);
            }
            catch (error) {
                console.log(error);
                const errorMessage = 'Error creating blog';
                (0, utils_1.errorResponse)(res, null, errorMessage, 500);
            }
        });
    }
    // change status of a blog
    changeStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { slug } = req.params;
                const blog = yield models_1.BlogModel.findOne({ slug });
                if (blog) {
                    blog.status = !blog.status;
                    blog.save();
                    (0, utils_1.successResponse)(res, blog, 'Blog status updated successfully', 200);
                }
                else {
                    (0, utils_1.errorResponse)(res, null, 'Blog not found', 404);
                }
            }
            catch (error) {
                const errorMessage = 'Error updating blog status';
                (0, utils_1.errorResponse)(res, null, errorMessage, 500);
            }
        });
    }
    getBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { slug } = req.params;
                const blog = yield models_1.BlogModel.findOne({ slug });
                if (blog) {
                    (0, utils_1.successResponse)(res, blog, 'Blog fetched successfully', 200);
                }
                else {
                    (0, utils_1.errorResponse)(res, null, 'Blog not found', 404);
                }
            }
            catch (error) {
                const errorMessage = 'Error getting blog';
                (0, utils_1.errorResponse)(res, null, errorMessage, 500);
            }
        });
    }
    updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { slug } = req.params;
                const blog = yield models_1.BlogModel.findOne({ slug });
                if (blog) {
                    if (req.file) {
                        req.body.image = yield (0, utils_1.fileUpload)(req, 'blog');
                        yield (0, utils_1.deleteFile)(blog.image);
                    }
                    const updatedBlog = yield models_1.BlogModel.findOneAndUpdate({ slug }, Object.assign({}, req.body), { new: true });
                    (0, utils_1.successResponse)(res, updatedBlog, 'Blog updated successfully', 200);
                }
                else {
                    (0, utils_1.errorResponse)(res, null, 'Blog not found', 404);
                }
            }
            catch (error) {
                const errorMessage = 'Error updating blog';
                (0, utils_1.errorResponse)(res, null, errorMessage, 500);
            }
        });
    }
    deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { slug } = req.params;
                const blog = yield models_1.BlogModel.findOne({ slug });
                if (blog) {
                    yield models_1.BlogModel.findOneAndDelete({ slug });
                    (0, utils_1.successResponse)(res, null, 'Blog deleted successfully', 200);
                }
                else {
                    (0, utils_1.errorResponse)(res, null, 'Blog not found', 404);
                }
            }
            catch (error) {
                const errorMessage = 'Error deleting blog';
                (0, utils_1.errorResponse)(res, null, errorMessage, 500);
            }
        });
    }
    getActiveBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield models_1.BlogModel.find();
                const activeBlogs = blogs.filter((blog) => blog.status);
                (0, utils_1.successResponse)(res, activeBlogs, 'Blogs fetched successfully', 200);
            }
            catch (error) {
                const errorMessage = 'Error getting blogs';
                (0, utils_1.errorResponse)(res, null, errorMessage, 500);
            }
        });
    }
}
exports.BlogController = BlogController;
