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
exports.getTopUserPostWithLatestCommentController = exports.getUserController = exports.getUsersController = exports.loginController = exports.registerUserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const helpers_1 = require("../helpers");
const jwt_1 = require("../helpers/jwt");
const redis_1 = require("../redis");
const conflict_1 = require("../errors/conflict");
const auth_service_1 = require("../services/auth-service");
const post_service_1 = require("../services/post-service");
const registerUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        const userExists = yield (0, auth_service_1.findUserService)(email);
        if (userExists)
            throw new conflict_1.ConflictError("User already exists");
        const user = yield (0, auth_service_1.registerUserService)({
            firstName,
            lastName,
            email,
            password,
        });
        if (!user)
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ errors: [{ message: "User not created" }] });
        delete user.password;
        const users = yield (0, auth_service_1.findAllUsersService)();
        const cacheKey = "users";
        yield redis_1.redisClient.set(cacheKey, JSON.stringify(users));
        return (0, helpers_1.successResponse)(res, http_status_codes_1.StatusCodes.CREATED, user);
    }
    catch (error) {
        next(error);
    }
});
exports.registerUserController = registerUserController;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, auth_service_1.findUserService)(email);
        if (!user)
            throw new errors_1.UnauthorizedError("Invalid Credentials");
        const passwordMatch = yield helpers_1.Password.comparePassword(password, user === null || user === void 0 ? void 0 : user.password);
        if (!passwordMatch)
            throw new errors_1.UnauthorizedError("Invalid Credentials");
        const userJWT = (0, jwt_1.generateJWT)({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        });
        delete user.password;
        return (0, helpers_1.successResponse)(res, http_status_codes_1.StatusCodes.OK, { user, token: userJWT });
    }
    catch (error) {
        next(error);
    }
});
exports.loginController = loginController;
const getUsersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, auth_service_1.findAllUsersService)();
        const cacheKey = "users";
        yield redis_1.redisClient.set(cacheKey, JSON.stringify(users));
        return (0, helpers_1.successResponse)(res, http_status_codes_1.StatusCodes.OK, users);
    }
    catch (error) {
        next(error);
    }
});
exports.getUsersController = getUsersController;
const getUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userPosts = yield (0, auth_service_1.findUserPostsService)(id);
        if (!userPosts)
            throw new errors_1.NotFoundError("User not found");
        const cacheKey = `user:${id}`;
        yield redis_1.redisClient.set(cacheKey, JSON.stringify(userPosts));
        return (0, helpers_1.successResponse)(res, http_status_codes_1.StatusCodes.OK, userPosts);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserController = getUserController;
const getTopUserPostWithLatestCommentController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, post_service_1.getTopUsersWithLatestCommentsService)();
        return (0, helpers_1.successResponse)(res, http_status_codes_1.StatusCodes.OK, users);
    }
    catch (error) {
        next(error);
    }
});
exports.getTopUserPostWithLatestCommentController = getTopUserPostWithLatestCommentController;
