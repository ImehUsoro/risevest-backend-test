"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.generateJWT = void 0;
const errors_1 = require("../errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (req, payload) => {
    const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days
    const userJWT = jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, payload), { exp }), process.env.JWT_SECRET);
    return userJWT;
};
exports.generateJWT = generateJWT;
const verifyJWT = (token) => {
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw new errors_1.BadRequestError("Login to continue");
        }
        else {
            throw new errors_1.BadRequestError("Invalid token");
        }
    }
};
exports.verifyJWT = verifyJWT;
