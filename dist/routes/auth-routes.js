"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth-controller");
const validate_request_1 = require("../helpers/validate-request");
const schemas_1 = require("../schemas");
const middleware_1 = require("../middleware");
const userPosts_1 = require("../middleware/redis/userPosts");
const user_1 = require("../middleware/redis/user");
const router = (0, express_1.Router)();
exports.authenticationRoutes = router;
router
    .route("/register-user")
    .post(schemas_1.registerUserSchema, validate_request_1.validateRequestMiddleware, auth_controller_1.registerUserController);
router
    .route("/login")
    .post(schemas_1.loginUserSchema, validate_request_1.validateRequestMiddleware, auth_controller_1.loginController);
// protected routes
router.use(middleware_1.currentUserMiddleware);
//Get all users
router.route("/").get(user_1.getCachedUsers, auth_controller_1.getUsersController);
//Get a user
router.route("/:id/posts").get(userPosts_1.getUserPostCache, auth_controller_1.getUserController);
// Get Users With The Top 3 Most Posts And Their Latest Comment
router.route("/top-three").get(auth_controller_1.getTopUserPostWithLatestCommentController);
