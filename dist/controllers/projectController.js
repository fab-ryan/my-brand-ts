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
exports.projectController = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
class projectController {
    static getProjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield models_1.ProjectModel.find();
                (0, utils_1.successResponse)(res, projects, 'Projects retrieved successfully');
            }
            catch (error) {
                const errorMessages = error.message;
                (0, utils_1.errorResponse)(res, null, errorMessages, 500);
            }
        });
    }
    static getProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield models_1.ProjectModel.findById(req.params.id);
                (0, utils_1.successResponse)(res, project, 'Project retrieved successfully', 200);
            }
            catch (error) {
                const errorMessages = error.message;
                (0, utils_1.errorResponse)(res, null, errorMessages, 500);
            }
        });
    }
    static createProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.file) {
                    req.body.image = yield (0, utils_1.fileUpload)(req, 'project');
                }
                const project = yield models_1.ProjectModel.create(req.body);
                (0, utils_1.successResponse)(res, project, 'Project created successfully', 201);
            }
            catch (error) {
                const errorMessages = error.message;
                (0, utils_1.errorResponse)(res, null, errorMessages, 500);
            }
        });
    }
    static updateProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.file) {
                    req.body.image = yield (0, utils_1.fileUpload)(req, 'project');
                }
                const project = yield models_1.ProjectModel.findOne({ _id: req.params.id });
                if (project) {
                    if (req.file) {
                        if (project.image) {
                            yield (0, utils_1.deleteFile)(project.image);
                        }
                    }
                    yield project.updateOne(req.body);
                    (0, utils_1.successResponse)(res, project, 'Project updated successfully', 200);
                }
                else {
                    (0, utils_1.errorResponse)(res, null, 'Project not found', 404);
                }
            }
            catch (error) {
                const errorMessages = error.message;
                (0, utils_1.errorResponse)(res, null, errorMessages, 500);
            }
        });
    }
    static changeProjectStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield models_1.ProjectModel.findOne({ _id: req.params.id });
                if (project) {
                    const status = project.status ? false : true;
                    yield project.updateOne({ status });
                    (0, utils_1.successResponse)(res, project, 'Project status changed successfully', 200);
                }
                else {
                    (0, utils_1.errorResponse)(res, null, 'Project not found', 404);
                }
            }
            catch (error) {
                const errorMessages = error.message;
                (0, utils_1.errorResponse)(res, null, errorMessages, 500);
            }
        });
    }
    static deleteProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield models_1.ProjectModel.findOne({ _id: req.params.id });
                if (project) {
                    if (project.image) {
                        yield (0, utils_1.deleteFile)(project.image);
                    }
                    yield project.deleteOne();
                    (0, utils_1.successResponse)(res, null, 'Project deleted successfully', 200);
                }
                else {
                    (0, utils_1.errorResponse)(res, null, 'Project not found', 404);
                }
            }
            catch (error) {
                const errorMessages = error.message;
                (0, utils_1.errorResponse)(res, null, errorMessages, 500);
            }
        });
    }
}
exports.projectController = projectController;
