"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = void 0;
const { body } = require("express-validator");
exports.loginUserSchema = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be valid"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isString()
        .withMessage("Password must be in string format"),
];
