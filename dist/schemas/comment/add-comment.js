"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommentSchema = void 0;
const { body, param } = require("express-validator");
exports.addCommentSchema = [
    param("postId").notEmpty().withMessage("postId is required"),
    body("content")
        .notEmpty()
        .withMessage("Content is required")
        .isString()
        .withMessage("Password must be in string format"),
];
