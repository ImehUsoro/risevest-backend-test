"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../logger"));
const notFound = (req, res) => {
    const message = "Route does not exist";
    logger_1.default.error(message);
    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message });
};
exports.notFound = notFound;
