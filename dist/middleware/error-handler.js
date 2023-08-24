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
exports.dbErrors = exports.errorHandlerMiddleware = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const logger_1 = __importDefault(require("../logger"));
const errorHandlerMiddleware = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Server related errors
    if (err instanceof errors_1.CustomError) {
        logger_1.default.error(err.serializeErrors());
        return res.status(err.statusCode).json({ errors: err.serializeErrors() });
    }
    logger_1.default.error({ err });
    // Prisma related errors
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002")
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ errors: [{ message: "Unique constraint" }] });
        if (err.code === "P2025")
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ errors: [{ message: (_a = err.meta) === null || _a === void 0 ? void 0 : _a.cause }] });
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ errors: [{ message: "Something went wrong" }] });
    }
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ errors: [{ message: "please fill out all fields" }] });
    }
    // Other uncaught errors
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: [{ message: err.message }],
    });
});
exports.errorHandlerMiddleware = errorHandlerMiddleware;
const dbErrors = (err, req, res, next) => {
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        // console.log(err);
        return res
            .status(400)
            .json({ error: "Prisma client request error", message: err.message });
    }
    else if (err instanceof client_1.Prisma.PrismaClientUnknownRequestError) {
        console.error("Unknown Prisma error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
    next(err);
};
exports.dbErrors = dbErrors;
