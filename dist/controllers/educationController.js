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
exports.educationController = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
class educationController {
    static getEducations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const status = req.query.status;
                const educations = yield models_1.EducationModel.find();
                console.log(status, educations);
                (0, utils_1.successResponse)(res, educations, 'Educations retrieved successfully');
            }
            catch (error) {
                const errorMessages = error.message;
                (0, utils_1.errorResponse)(res, null, errorMessages, 500);
            }
        });
    }
    static getEducation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const education = yield models_1.EducationModel.findById(req.params.id);
                (0, utils_1.successResponse)(res, education, 'Education retrieved successfully', 200);
            }
            catch (error) {
                const errorMessages = error.message;
                (0, utils_1.errorResponse)(res, null, errorMessages, 500);
            }
        });
    }
    static createEducation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const education = yield models_1.EducationModel.create(req.body);
                (0, utils_1.successResponse)(res, education, 'Education created successfully', 201);
            }
            catch (error) {
                const errorMessages = error.message;
                (0, utils_1.errorResponse)(res, null, errorMessages, 500);
            }
        });
    }
    static updateEducation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const education = yield models_1.EducationModel.findOne({ _id: req.params.id });
                if (education) {
                    yield education.updateOne(req.body);
                    (0, utils_1.successResponse)(res, education, 'Education updated successfully', 200);
                }
                else {
                    (0, utils_1.errorResponse)(res, null, 'Education not found', 404);
                }
            }
            catch (error) {
                const errorMessages = error.message;
                (0, utils_1.errorResponse)(res, null, errorMessages, 500);
            }
        });
    }
    static deleteEducation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const education = yield models_1.EducationModel.findOne({ _id: req.params.id });
                if (education) {
                    yield education.deleteOne();
                    (0, utils_1.successResponse)(res, null, 'Education deleted successfully', 200);
                }
                else {
                    (0, utils_1.errorResponse)(res, null, 'Education not found', 404);
                }
            }
            catch (error) {
                const errorMessages = error.message;
                (0, utils_1.errorResponse)(res, null, errorMessages, 500);
            }
        });
    }
}
exports.educationController = educationController;
