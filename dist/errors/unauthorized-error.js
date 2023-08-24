"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_error_1 = require("./custom-error");
class UnauthorizedError extends custom_error_1.CustomError {
    constructor() {
        super("Not Authorized");
        this.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
exports.UnauthorizedError = UnauthorizedError;
