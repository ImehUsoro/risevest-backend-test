const { body, param } = require("express-validator");

export const addCommentSchema = [
  param("postId").notEmpty().withMessage("postId is required"),
  body("content")
    .notEmpty()
    .withMessage("Content is required")
    .isString()
    .withMessage("Password must be in string format"),
];
