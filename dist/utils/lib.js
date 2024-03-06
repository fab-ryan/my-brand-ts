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
exports.generateToken = exports.decryptPassword = exports.encryptPassword = exports.deleteFile = exports.fileUpload = exports.generateSlug = void 0;
const middlewares_1 = require("../middlewares");
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const getSlug = (title) => {
    const lowerCaseTitle = title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/ +(?= )/g, '');
    return lowerCaseTitle.split(' ').join('-');
};
const generateSlug = (title, dbModal) => __awaiter(void 0, void 0, void 0, function* () {
    const MAX_TRIES = 10;
    let slug = getSlug(title);
    let counter = 0;
    let existingSlug = yield dbModal.exists({ slug });
    while (existingSlug && counter < MAX_TRIES) {
        slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
        existingSlug = yield dbModal.exists({ slug });
        counter++;
    }
    if (counter === MAX_TRIES) {
        middlewares_1.logger.error('Error generating slug', { label: 'generateSlug' });
        throw new Error('Error generating slug');
    }
    return slug;
});
exports.generateSlug = generateSlug;
const fileUpload = (req, folder = 'blog') => __awaiter(void 0, void 0, void 0, function* () {
    middlewares_1.logger.info('Uploading to cloudinary', { label: 'fileUpload' });
    try {
        const file = req.file;
        const buffer = (file === null || file === void 0 ? void 0 : file.buffer) || Buffer.from('');
        const tempFilePath = path_1.default.join(os_1.default.tmpdir(), (file === null || file === void 0 ? void 0 : file.originalname) || '');
        fs_1.default.writeFile(tempFilePath, buffer, (err) => {
            if (err) {
                middlewares_1.logger.error('Error writing file to temp folder', {
                    label: 'fileUpload',
                });
                throw new Error('Error writing file to temp folder');
            }
        });
        const response = yield middlewares_1.cloudinary.v2.uploader.upload(tempFilePath, {
            folder: folder,
        });
        fs_1.default.unlink(tempFilePath, (err) => {
            if (err) {
                middlewares_1.logger.error('Error deleting file from temp folder', {
                    label: 'fileUpload',
                });
                throw new Error('Error deleting file from temp folder');
            }
        });
        return response.secure_url;
    }
    catch (error) {
        middlewares_1.logger.error(error.message, { label: 'fileUpload' });
        throw new Error(`Error uploading to cloudinary', ${error.message}`);
    }
});
exports.fileUpload = fileUpload;
const deleteFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield middlewares_1.cloudinary.v2.uploader.destroy(file);
        return response;
    }
    catch (error) {
        middlewares_1.logger.error('Error deleting from cloudinary', { label: 'deleteFile' });
        throw new Error('Error deleting from cloudinary');
    }
});
exports.deleteFile = deleteFile;
const encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    middlewares_1.logger.info('Encrypting password', { label: 'encryptPassword' });
    try {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        return hashedPassword;
    }
    catch (error) {
        middlewares_1.logger.error('Error encrypting password', { label: 'encryptPassword' });
        throw new Error('Error encrypting password');
    }
});
exports.encryptPassword = encryptPassword;
const decryptPassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    middlewares_1.logger.info('Decrypting password', { label: 'decryptPassword' });
    try {
        const isValid = yield bcrypt_1.default.compare(password, hashedPassword);
        return isValid;
    }
    catch (error) {
        middlewares_1.logger.error('Error decrypting password', { label: 'decryptPassword' });
        throw new Error('Error decrypting password');
    }
});
exports.decryptPassword = decryptPassword;
const generateToken = (user) => {
    middlewares_1.logger.info('Generating token', { label: 'generateToken' });
    try {
        const token = jsonwebtoken_1.default.sign(user, config_1.envConfig.secret, { expiresIn: '1d' });
        return token;
    }
    catch (error) {
        middlewares_1.logger.error('Error generating token', { label: 'generateToken' });
        throw new Error('Error generating token');
    }
};
exports.generateToken = generateToken;
