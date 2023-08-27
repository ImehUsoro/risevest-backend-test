"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = require("express");
const post_controller_1 = require("../controllers/post-controller");
const validate_request_1 = require("../helpers/validate-request");
const middleware_1 = require("../middleware");
const schemas_1 = require("../schemas");
const router = (0, express_1.Router)();
exports.postRoutes = router;
router.use(middleware_1.currentUserMiddleware);
router
    .route("/create")
    .post(schemas_1.addPostSchema, validate_request_1.validateRequestMiddleware, post_controller_1.createPostController);
// Add a comment to post
router
    .route("/:postId/comments")
    .post(schemas_1.addCommentSchema, validate_request_1.validateRequestMiddleware, post_controller_1.addCommentToPostController);
