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
exports.findPostService = exports.createPostService = void 0;
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
