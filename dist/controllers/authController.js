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
exports.loginController = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield models_1.UserModel.findOne({ email });
        if (!user) {
            return (0, utils_1.errorResponse)(res, null, 'User Not Found', 400);
        }
        const isMatch = yield (0, utils_1.decryptPassword)(password, user.password);
        if (!isMatch) {
            return (0, utils_1.errorResponse)(res, null, 'Invalid Credentials', 400);
        }
        const token = (0, utils_1.generateToken)({ id: user._id, email: user.email, role: user.role });
        const payload = {
            access_token: token,
            token_type: 'Bearer',
        };
        return (0, utils_1.successResponse)(res, payload, 'Login Successful', 200);
    }
    catch (error) {
        const message = error.message;
        return (0, utils_1.errorResponse)(res, null, message, 500);
    }
});
exports.loginController = loginController;
