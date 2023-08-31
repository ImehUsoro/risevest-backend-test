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
exports.setupRedisMocks = exports.setupPrismaMocks = void 0;
const prismaClient_1 = require("./prismaClient");
const redis_1 = require("./redis");
const setupPrismaMocks = () => {
    // jest.mock("@prisma/client", () => {
    //   return {
    //     PrismaClient: jest.fn(() => ({
    //       $use: jest.fn(),
    //       $on: jest.fn(),
    //       PrismaClientKnownRequestError: jest.fn(),
    //       user: {
    //         findUnique: jest.fn(),
    //         findMany: jest.fn(),
    //         create: jest.fn(),
    //       },
    //       post: {
    //         findMany: jest.fn(),
    //         findUnique: jest.fn(),
    //       },
    //       comment: {
    //         findFirst: jest.fn(),
    //         create: jest.fn(),
    //       },
    //       $disconnect: jest.fn(),
    //     })),
    //   };
    // });
    jest.mock("@prisma/client", () => {
        return {
            PrismaClient: jest.fn(() => ({
                $use: jest.fn(),
                $on: jest.fn(),
                PrismaClientKnownRequestError: jest.fn(),
                user: {
                    findMany: jest.fn(),
                },
                comment: {
                    findFirst: jest.fn(),
                },
                $disconnect: jest.fn(),
            })),
        };
    });
    beforeEach(() => {
        // (prisma.user.create as jest.Mock).mockClear();
        // (prisma.user.findUnique as jest.Mock).mockClear();
        // (prisma.user.findMany as jest.Mock).mockClear();
        // (prisma.post.findMany as jest.Mock).mockClear();
        // (prisma.post.findUnique as jest.Mock).mockClear();
        // (prisma.comment.findFirst as jest.Mock).mockClear();
        // (prisma.comment.create as jest.Mock).mockClear();
        // (redisClient.set as jest.Mock).mockClear();
        // (redisClient.get as jest.Mock).mockClear();
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaClient_1.prisma.$disconnect();
    }));
};
exports.setupPrismaMocks = setupPrismaMocks;
const setupRedisMocks = () => {
    jest.mock("redis", () => {
        return {
            createClient: jest.fn(() => ({
                set: jest.fn(),
                get: jest.fn(),
            })),
        };
    });
    beforeEach(() => {
        redis_1.redisClient.set.mockClear();
        redis_1.redisClient.get.mockClear();
    });
};
exports.setupRedisMocks = setupRedisMocks;
