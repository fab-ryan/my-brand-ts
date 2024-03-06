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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
class UserController {
    // getting all users
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield models_1.UserModel.find();
                (0, utils_1.successResponse)(res, users, 'Users fetched successfully', 200);
            }
            catch (error) {
                const errorMessage = error.message || 'Error getting users';
                (0, utils_1.errorResponse)(res, null, errorMessage, 500);
            }
        });
    }
    // creating a user
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.password = yield (0, utils_1.encryptPassword)(req.body.password);
                const user = yield models_1.UserModel.create(req.body);
                const _a = user.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
                (0, utils_1.successResponse)(res, userWithoutPassword, 'User created successfully', 201);
            }
            catch (error) {
                const errorMessage = error.message || 'Error creating user';
                (0, utils_1.errorResponse)(res, null, errorMessage, 500);
            }
        });
    }
    // updating a user
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield models_1.UserModel.findOne({ _id: id });
                if (!user) {
                    (0, utils_1.errorResponse)(res, null, 'User not found', 404);
                    return;
                }
                if (req.body.password) {
                    req.body.password = yield (0, utils_1.encryptPassword)(req.body.password);
                }
                const updatedUser = yield models_1.UserModel.findByIdAndUpdate({ _id: id }, req.body);
                const payload = Object.assign(Object.assign(Object.assign({}, updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.toObject()), req.body), { encryptPassword: undefined });
                (0, utils_1.successResponse)(res, payload, 'User updated successfully', 200);
            }
            catch (error) {
                const errorMessage = error.message || 'Error updating user';
                (0, utils_1.errorResponse)(res, null, errorMessage, 500);
            }
        });
    }
    // deleting a user
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield models_1.UserModel.findByIdAndDelete({ _id: id });
                (0, utils_1.successResponse)(res, null, 'User deleted successfully', 200);
            }
            catch (error) {
                const errorMessage = error.message || 'Error deleting user';
                (0, utils_1.errorResponse)(res, null, errorMessage, 500);
            }
        });
    }
    // getting a user
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield models_1.UserModel.findOne({ _id: id });
                if (user) {
                    (0, utils_1.successResponse)(res, user, 'User fetched successfully', 200);
                }
                else {
                    (0, utils_1.errorResponse)(res, null, 'User not found', 404);
                }
            }
            catch (error) {
                const errorMessage = error.message || 'Error getting user';
                (0, utils_1.errorResponse)(res, null, errorMessage, 500);
            }
        });
    }
}
exports.UserController = UserController;
