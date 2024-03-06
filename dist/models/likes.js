"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikesModel = void 0;
const mongoose_1 = require("mongoose");
const LikesSchema = new mongoose_1.Schema({
    blog: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Blog',
    },
    os: {
        type: String,
        required: false,
        default: 'Unknown',
    },
    browser: {
        type: String,
        required: false,
        default: 'Unknown',
    },
}, {
    timestamps: true,
});
const likes = (0, mongoose_1.model)('Likes', LikesSchema);
exports.LikesModel = likes;
