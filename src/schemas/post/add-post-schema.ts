const { body } = require("express-validator");

export const addPostSchema = [
  body("content")
    .notEmpty()
    .withMessage("Content is required")
    .isString()
    .withMessage("Content must be in string format"),
];
