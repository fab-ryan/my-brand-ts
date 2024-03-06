"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentValidation = void 0;
const zod_1 = require("zod");
exports.commentValidation = zod_1.z.object({
    comment: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    name: zod_1.z.string().min(1),
});
