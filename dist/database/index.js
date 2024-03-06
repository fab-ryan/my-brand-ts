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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const middlewares_1 = require("../middlewares");
const { db, password, username } = config_1.envConfig;
const dbUrl = db.replace('<password>', password);
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(dbUrl, {
            auth: {
                username,
                password,
            },
        });
        middlewares_1.logger.info('db connected 🌐');
    }
    catch (err) {
        middlewares_1.logger.error('db connection failed ❌ , error: ', err);
    }
});
const close = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connection.close();
        middlewares_1.logger.info('db connection closed 🌐');
    }
    catch (err) {
        middlewares_1.logger.error('db connection close failed ❌ , error: ', err);
    }
});
exports.close = close;
exports.default = connect;
