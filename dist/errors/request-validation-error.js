"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_error_1 = require("./custom-error");
class RequestValidationError extends custom_error_1.CustomError {
    constructor(errors) {
        super("Invalid Request Parameters");
        this.errors = errors;
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map((err) => {
            return { message: err.msg, field: err.path };
        });
    }
}
exports.RequestValidationError = RequestValidationError;
