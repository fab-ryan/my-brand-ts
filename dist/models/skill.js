"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillModel = void 0;
const mongoose_1 = require("mongoose");
const SkillSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    percent: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
});
const skill = (0, mongoose_1.model)('Skill', SkillSchema);
exports.SkillModel = skill;
