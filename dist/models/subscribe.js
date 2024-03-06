"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribersModel = void 0;
const mongoose_1 = require("mongoose");
const SubscribersSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const subscribers = (0, mongoose_1.model)('Subscribers', SubscribersSchema);
exports.SubscribersModel = subscribers;
