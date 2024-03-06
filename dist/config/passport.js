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
exports.configurePassport = void 0;
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const config_1 = require("./config");
const models_1 = require("../models");
const strategy = passport_jwt_1.default.Strategy;
const extractJwt = passport_jwt_1.default.ExtractJwt;
const options = {
    secretOrKey: config_1.currentConfig.secret,
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
};
const configurePassport = (passport) => {
    passport.use(new strategy(options, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield models_1.UserModel.findById(payload.id);
            if (user) {
                const UserPayload = {
                    id: user === null || user === void 0 ? void 0 : user._id,
                    email: user === null || user === void 0 ? void 0 : user.email,
                    role: user === null || user === void 0 ? void 0 : user.role,
                };
                return done(null, UserPayload);
            }
            return done(null, false);
        }
        catch (error) {
            return done(error, false);
        }
    })));
};
exports.configurePassport = configurePassport;
const checkTime = (exp) => {
    return exp < Date.now();
};
