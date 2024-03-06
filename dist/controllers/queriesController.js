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
exports.QueryController = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
class QueryController {
    getQueries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queries = yield models_1.QueryModel.find();
                (0, utils_1.successResponse)(res, queries, 'Queries retrieved successfully');
            }
            catch (error) {
                const errorMessage = error.message;
                (0, utils_1.errorResponse)(res, null, errorMessage, 500);
            }
        });
    }
    getQuery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield models_1.QueryModel.findById(req.params.id);
                if (!query) {
                    (0, utils_1.errorResponse)(res, null, 'Query not found', 404);
                }
                (0, utils_1.successResponse)(res, query, 'Query retrieved successfully');
            }
            catch (error) {
                const errorMessage = error.message;
                (0, utils_1.errorResponse)(res, null, errorMessage, 500);
            }
        });
    }
    createQuery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = new models_1.QueryModel(req.body);
                yield query.save();
                (0, utils_1.successResponse)(res, query, 'Query created successfully', 201);
            }
            catch (error) {
                const errorMessage = error.message;
                (0, utils_1.errorResponse)(res, null, errorMessage, 500);
            }
        });
    }
    deleteQuery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield models_1.QueryModel.findByIdAndDelete(req.params.id);
                res.json(query);
            }
            catch (error) { }
        });
    }
}
exports.QueryController = QueryController;
