"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryModel = void 0;
const mongoose_1 = require("mongoose");
const QuerySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: false,
        default: Date.now,
    },
});
const Query = (0, mongoose_1.model)('Query', QuerySchema);
exports.QueryModel = Query;
