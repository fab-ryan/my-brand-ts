"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCategoryModel = void 0;
const mongoose_1 = require("mongoose");
const ProjectCategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
const projectCategory = (0, mongoose_1.model)('ProjectCategory', ProjectCategorySchema);
exports.ProjectCategoryModel = projectCategory;
