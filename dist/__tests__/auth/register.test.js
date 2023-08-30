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
const request = (0, supertest_1.default)(app_1.default);
jest.mock("@prisma/client", () => {
    return {
        PrismaClient: jest.fn(() => ({
            $use: jest.fn(),
            $on: jest.fn(),
            PrismaClientKnownRequestError: jest.fn(),
            user: {
                findUnique: jest.fn(),
                findMany: jest.fn(),
                create: jest.fn(),
            },
            $disconnect: jest.fn(),
        })),
    };
});
jest.mock("redis", () => {
    return {
        createClient: jest.fn(() => ({
            set: jest.fn(),
        })),
    };
});
beforeEach(() => {
    prismaClient_1.prisma.user.findUnique.mockClear();
    prismaClient_1.prisma.user.create.mockClear();
    prismaClient_1.prisma.user.findMany.mockClear();
    redis_1.redisClient.set.mockClear();
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.prisma.$disconnect();
}));
describe("Register User Controller", () => {
    it("should register a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        prismaClient_1.prisma.user.findUnique.mockResolvedValue(null);
        prismaClient_1.prisma.user.create.mockResolvedValue(helpers_1.resolvedNewUser);
        redis_1.redisClient.set.mockResolvedValue(null);
        const response = yield request
            .post(`${helpers_1.baseURL}/users/register-user`)
            .send(helpers_1.newUser);
        expect(response.status).toBe(201);
        expect(redis_1.redisClient.set).toHaveBeenCalled();
        expect(prismaClient_1.prisma.user.create).toHaveBeenCalled();
        expect(prismaClient_1.prisma.user.findUnique).toHaveBeenCalled();
    }));
    it("should return an error if user already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        prismaClient_1.prisma.user.findUnique.mockResolvedValue(helpers_1.resolvedNewUser);
        const response = yield request
            .post(`${helpers_1.baseURL}/users/register-user`)
            .send(helpers_1.newUser)
            .expect(409);
        const { errors } = response.body;
        expect(response.status).toBe(409);
        expect(errors[0].message).toBe("User already exists");
    }));
});
