"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryParamsSchema = exports.QuerySchema = void 0;
const zod_1 = require("zod");
exports.QuerySchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    message: zod_1.z.string(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.QueryParamsSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
