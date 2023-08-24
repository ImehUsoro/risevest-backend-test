"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_error_1 = require("./custom-error");
class ForbiddenError extends custom_error_1.CustomError {
    constructor() {
        super("Forbidden");
        this.statusCode = http_status_codes_1.StatusCodes.FORBIDDEN;
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
exports.ForbiddenError = ForbiddenError;
