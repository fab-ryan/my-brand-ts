"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.loggerMiddleware = void 0;
const morgan_1 = __importDefault(require("morgan"));
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, label, printf, json } = winston_1.default.format;
const fileCombineTransport = new winston_daily_rotate_file_1.default({
    filename: './logs/%DATE%-combined.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
});
const logger = winston_1.default.createLogger({
    level: 'http',
    format: combine(label({ label: process.env.LOG_LABEL || 'app' }), timestamp(), printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] ${level}: ${message}`;
    }), json()),
    defaultMeta: { service: 'user-service' },
    transports: [
        fileCombineTransport,
        new winston_1.default.transports.Console(),
    ],
});
exports.logger = logger;
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple(),
    }));
}
exports.loggerMiddleware = (0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms', {
    stream: {
        write: (message) => {
            logger.http(message.trim());
        },
    },
});
