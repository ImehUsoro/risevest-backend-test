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
exports.findAllUsersService = exports.findUserPostsService = exports.findUserService = exports.registerUserService = void 0;
const prismaClient_1 = require("../prismaClient");
const registerUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_1.prisma.user.create({ data });
    return user;
});
exports.registerUserService = registerUserService;
const findUserService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.prisma.user.findUnique({
        where: { email },
    });
});
exports.findUserService = findUserService;
// export const findUserPostsService = async (
//   id: string
// ): Promise<Post[] | null> => {
//   return await prisma.post.findMany({
//     where: { userId: id },
//     include: {
//       user: {
//         select: {
//           id: true,
//           firstName: true,
//           lastName: true,
//         },
//       },
//       comments: {
//         select: {
//           content: true,
//           user: {
//             select: {
//               id: true,
//               firstName: true,
//               lastName: true,
//             },
//           },
//         },
//       },
//     },
//   });
// };
const findUserPostsService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            posts: {
                include: {
                    comments: {
                        select: {
                            content: true,
                            user: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                    createdAt: true,
                                },
                            },
                        },
                    },
                },
            },
            _count: {
                select: {
                    posts: true,
                    comments: true,
                },
            },
        },
    });
});
exports.findUserPostsService = findUserPostsService;
const findAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.prisma.user.findMany({
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            createdAt: true,
            updatedAt: true,
        },
    });
});
exports.findAllUsersService = findAllUsersService;
