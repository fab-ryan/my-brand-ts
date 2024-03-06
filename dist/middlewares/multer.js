"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUploads = exports.filterFile = void 0;
const multer_1 = __importDefault(require("multer"));
const filterFile = (file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.filterFile = filterFile;
exports.multerUploads = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    fileFilter: (req, file, cb) => {
        (0, exports.filterFile)(file, cb);
    },
});
