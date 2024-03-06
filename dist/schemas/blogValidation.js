"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogSchema = void 0;
const zod_1 = require("zod");
exports.blogSchema = zod_1.z.object({
    title: zod_1.z
        .string({
        required_error: 'Title is required',
    })
        .min(3, {
        message: 'Title must be at least 3 characters long',
    })
        .max(255),
    content: zod_1.z
        .string({
        required_error: 'Content is required',
    })
        .min(10, {
        message: 'Content must be at least 10 characters long',
    }),
    preview: zod_1.z
        .string({
        required_error: 'Preview is required',
    })
        .min(10, {
        message: 'Preview must be at least 10 characters long',
    }),
});
