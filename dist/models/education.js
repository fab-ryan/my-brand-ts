"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationModel = void 0;
const mongoose_1 = require("mongoose");
const EducationSchema = new mongoose_1.Schema({
    institution: {
        type: String,
        required: true,
    },
    field: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const education = (0, mongoose_1.model)('Education', EducationSchema);
exports.EducationModel = education;
