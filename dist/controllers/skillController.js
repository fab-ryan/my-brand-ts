"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillController = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
class skillController {
    static getSkills(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const status = req.query.status;
                const skills = status
                    ? yield models_1.SkillModel.find({ status })
                    : yield models_1.SkillModel.find();
                (0, utils_1.successResponse)(res, skills, 'Skills retrieved successfully');
            }
            catch (error) {
                const errorMessages = error.message;
                (0, utils_1.errorResponse)(res, null, errorMessages, 500);
            }
        });
    }
    static getSkill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skill = yield models_1.SkillModel.findById(req.params.id);
                (0, utils_1.successResponse)(res, skill, 'Skill retrieved successfully', 200);
            }
            catch (error) {
                const errorMessages = error.message;
                (0, utils_1.errorResponse)(res, null, errorMessages, 500);
            }
        });
    }
    static createSkill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skill = yield models_1.SkillModel.create(req.body);
                (0, utils_1.successResponse)(res, skill, 'Skill created successfully', 201);
            }
            catch (error) {
                const errorMessages = error.message;
                (0, utils_1.errorResponse)(res, null, errorMessages, 500);
            }
        });
    }
    static updateSkill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skill = yield models_1.SkillModel.findOne({ _id: req.params.id });
                if (skill) {
                    yield skill.updateOne(req.body);
                    (0, utils_1.successResponse)(res, skill, 'Skill updated successfully', 200);
                }
                else {
                    (0, utils_1.errorResponse)(res, null, 'Skill not found', 404);
                }
            }
            catch (error) {
                const errorMessages = error.message;
                (0, utils_1.errorResponse)(res, null, errorMessages, 500);
            }
        });
    }
    static deleteSkill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skill = yield models_1.SkillModel.findOne({ _id: req.params.id });
                if (skill) {
                    yield skill.deleteOne();
                    (0, utils_1.successResponse)(res, null, 'Skill deleted successfully', 200);
                }
                else {
                    (0, utils_1.errorResponse)(res, null, 'Skill not found', 404);
                }
            }
            catch (error) {
                const errorMessages = error.message;
                (0, utils_1.errorResponse)(res, null, errorMessages, 500);
            }
        });
    }
    static changeSkillStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skill = yield models_1.SkillModel.findOne({ _id: req.params.id });
                if (skill) {
                    yield skill.updateOne({ status: !skill.status });
                    (0, utils_1.successResponse)(res, null, 'Skill status changed successfully', 200);
                }
                else {
                    (0, utils_1.errorResponse)(res, null, 'Skill not found', 404);
                }
            }
            catch (error) {
                const errorMessages = error.message;
                (0, utils_1.errorResponse)(res, null, errorMessages, 500);
            }
        });
    }
}
exports.skillController = skillController;
