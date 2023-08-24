"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const currentUserMiddleware = (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        // Set token from Bearer Token
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ Message: "Not Logged In" });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.currentUser = payload;
    }
    catch (error) {
        console.log({ error });
        next(error);
    }
    next();
};
exports.currentUserMiddleware = currentUserMiddleware;
