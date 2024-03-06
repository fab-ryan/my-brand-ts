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
exports.changeCategoryStatus = exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.query.status;
        const categories = status
            ? yield models_1.ProjectCategoryModel.find({ status })
            : yield models_1.ProjectCategoryModel.find();
        (0, utils_1.successResponse)(res, categories, 'Categories retrieved successfully');
    }
    catch (error) {
        const errorMessages = error.message;
        (0, utils_1.errorResponse)(res, null, errorMessages, 500);
    }
});
exports.getCategories = getCategories;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield models_1.ProjectCategoryModel.findById(req.params.id);
        (0, utils_1.successResponse)(res, category, 'Category retrieved successfully', 200);
    }
    catch (error) {
        const errorMessages = error.message;
        (0, utils_1.errorResponse)(res, null, errorMessages, 500);
    }
});
exports.getCategory = getCategory;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield models_1.ProjectCategoryModel.create(req.body);
        (0, utils_1.successResponse)(res, category, 'Category created successfully', 201);
    }
    catch (error) {
        const errorMessages = error.message;
        (0, utils_1.errorResponse)(res, null, errorMessages, 500);
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield models_1.ProjectCategoryModel.findOne({ _id: req.params.id });
        if (category) {
            yield category.updateOne(req.body);
            (0, utils_1.successResponse)(res, category, 'Category updated successfully', 201);
        }
        else {
            (0, utils_1.errorResponse)(res, null, 'Category not found', 404);
        }
    }
    catch (error) {
        const errorMessages = error.message;
        (0, utils_1.errorResponse)(res, null, errorMessages, 500);
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield models_1.ProjectCategoryModel.findOne({ _id: req.params.id });
        if (category) {
            yield category.deleteOne();
            (0, utils_1.successResponse)(res, null, 'Category deleted successfully');
        }
        else {
            (0, utils_1.errorResponse)(res, null, 'Category not found', 404);
        }
    }
    catch (error) {
        const errorMessages = error.message;
        (0, utils_1.errorResponse)(res, null, errorMessages, 500);
    }
});
exports.deleteCategory = deleteCategory;
const changeCategoryStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield models_1.ProjectCategoryModel.findOne({ _id: req.params.id });
        if (category) {
            yield category.updateOne({ status: !category.status });
            (0, utils_1.successResponse)(res, 'Category status updated successfully');
        }
    }
    catch (error) {
        (0, utils_1.errorResponse)(res, error);
    }
});
exports.changeCategoryStatus = changeCategoryStatus;
