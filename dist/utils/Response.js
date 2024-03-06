"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
    const response = {
        success: true,
        message,
        data,
        statusCode,
    };
    res.status(statusCode).json(response);
};
exports.successResponse = successResponse;
const errorResponse = (res, data, message = 'Internal Server Error', statusCode = 500) => {
    const response = {
        success: false,
        message,
        data,
        statusCode,
    };
    res.status(statusCode).json(response);
};
exports.errorResponse = errorResponse;
