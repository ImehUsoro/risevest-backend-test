"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPostSchema = void 0;
const { body } = require("express-validator");
exports.addPostSchema = [
    body("content")
        .notEmpty()
        .withMessage("Content is required")
        .isString()
        .withMessage("Content must be in string format"),
];
