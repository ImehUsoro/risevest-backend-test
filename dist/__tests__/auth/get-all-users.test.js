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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const helpers_1 = require("../../helpers");
const prismaClient_1 = require("../../prismaClient");
const redis_1 = require("../../redis");
const middleware_1 = require("../../middleware");
const request = (0, supertest_1.default)(app_1.default);
jest.mock("@prisma/client", () => {
    return {
        PrismaClient: jest.fn(() => ({
            $use: jest.fn(),
            $on: jest.fn(),
            PrismaClientKnownRequestError: jest.fn(),
            user: {
                findMany: jest.fn(),
            },
            $disconnect: jest.fn(),
        })),
    };
});
jest.mock("redis", () => {
    return {
        createClient: jest.fn(() => ({
            set: jest.fn(),
            get: jest.fn(),
        })),
    };
});
jest.mock("../../middleware/current-user.ts", () => {
    return {
        currentUserMiddleware: jest.fn((req, res, next) => {
            req.currentUser = helpers_1.currentUser;
            next();
        }),
    };
});
beforeEach(() => {
    prismaClient_1.prisma.user.findMany.mockClear();
    redis_1.redisClient.get.mockClear();
    middleware_1.currentUserMiddleware.mockClear();
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.prisma.$disconnect();
}));
describe("Get Users Controller", () => {
    it("should get all users when there is a bearer token", () => __awaiter(void 0, void 0, void 0, function* () {
        prismaClient_1.prisma.user.findMany.mockResolvedValue([helpers_1.resolvedNewUser]);
        redis_1.redisClient.get.mockResolvedValue(null);
        const response = yield request.get(`${helpers_1.baseURL}/users`);
        expect(response.status).toBe(200);
        expect(redis_1.redisClient.get).toHaveBeenCalled();
    }));
});
