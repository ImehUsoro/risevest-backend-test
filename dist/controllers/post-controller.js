"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommentToPostController = exports.createPostController = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const helpers_1 = require("../helpers");
const redis_1 = require("../redis");
const auth_service_1 = require("../services/auth-service");
const comment_service_1 = require("../services/comment-service");
const post_service_1 = require("../services/post-service");
const createPostController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content } = req.body;
        // checks if user exists in the db
        const findUser = yield (0, auth_service_1.findUserService)(req.currentUser.id);
        if (!findUser)
            throw new errors_1.NotFoundError("User not found");
        const post = yield (0, post_service_1.createPostService)(content, req.currentUser.id);
        const userPosts = yield (0, auth_service_1.findUserPostsService)(req.currentUser.id);
        const cacheKey = `user:${req.currentUser.id}`;
        yield redis_1.redisClient.set(cacheKey, JSON.stringify(userPosts));
        return (0, helpers_1.successResponse)(res, http_status_codes_1.StatusCodes.CREATED, post);
    }
    catch (error) {
        next(error);
    }
});
exports.createPostController = createPostController;
const addCommentToPostController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const { content } = req.body;
        const findUser = yield (0, auth_service_1.findUserService)(req.currentUser.id);
        if (!findUser)
            throw new errors_1.NotFoundError("User not found");
        const post = yield (0, post_service_1.findPostService)(postId);
        if (!post)
            throw new errors_1.NotFoundError("Post not found");
        const comment = yield (0, comment_service_1.addCommentToPostService)({
            content,
            userId: req.currentUser.id,
            postId,
        });
        // update the owner of the post's redis cache
        const authorPosts = yield (0, auth_service_1.findUserPostsService)(post.userId);
        const cacheKey = `user:${post.userId}`;
        yield redis_1.redisClient.set(cacheKey, JSON.stringify(authorPosts));
        return (0, helpers_1.successResponse)(res, http_status_codes_1.StatusCodes.CREATED, comment);
    }
    catch (error) {
        next(error);
    }
});
exports.addCommentToPostController = addCommentToPostController;
