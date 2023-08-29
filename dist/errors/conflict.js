"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_error_1 = require("./custom-error");
class ConflictError extends custom_error_1.CustomError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.CONFLICT;
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
exports.ConflictError = ConflictError;
