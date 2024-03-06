"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required',
    }),
    email: zod_1.z
        .string({
        required_error: 'Email is required',
    })
        .email({
        message: 'Invalid email address',
    }),
    password: zod_1.z
        .string({
        required_error: 'Password is required',
    })
        .min(8, {
        message: 'Password must be at least 8 characters long',
    }),
    role: zod_1.z
        .string({
        required_error: 'Role is required',
    })
        .optional(),
});
