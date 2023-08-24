const { body } = require("express-validator");

// ... Other middleware and route configurations ...

// Define a validation middleware for the request body
export const registerUserSchema = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("Name must be in string format")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long"),
  body("lastName")
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("Name must be in string format")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be in string format")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
