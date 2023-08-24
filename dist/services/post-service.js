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
exports.getTopUsersWithLatestCommentsService = exports.findPostService = exports.createPostService = void 0;
const client_1 = require("../client");
const createPostService = (content, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield client_1.prisma.post.create({ data: { content, userId } });
    return post;
});
exports.createPostService = createPostService;
const findPostService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.prisma.post.findUnique({
        where: { id },
    });
});
exports.findPostService = findPostService;
const getTopUsersWithLatestCommentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topUsersWithMostPosts = yield client_1.prisma.user.findMany({
            take: 3,
            orderBy: {
                posts: {
                    _count: "desc",
                },
            },
            include: {
                posts: true,
            },
        });
        const usersWithLatestComment = yield Promise.all(topUsersWithMostPosts.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            const latestComment = yield client_1.prisma.comment.findFirst({
                where: {
                    userId: user.id,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            return {
                user,
                latestComment,
            };
        })));
        return usersWithLatestComment;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getTopUsersWithLatestCommentsService = getTopUsersWithLatestCommentsService;
