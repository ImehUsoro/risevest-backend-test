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
const request = (0, supertest_1.default)(app_1.default);
jest.mock("@prisma/client", () => {
    return {
        Password: jest.fn().mockImplementation(() => {
            return { comparePassword: jest.fn() };
        }),
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
beforeEach(() => {
    prismaClient_1.prisma.user.findUnique.mockClear();
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.prisma.$disconnect();
}));
describe("Sign In User Controller", () => {
    it("should sign in a user", () => __awaiter(void 0, void 0, void 0, function* () {
        prismaClient_1.prisma.user.findUnique.mockResolvedValue(helpers_1.newLoginUser);
        const mockComparePassword = jest.fn().mockResolvedValue(true);
        helpers_1.Password.comparePassword = mockComparePassword;
        const response = yield request
            .post(`${helpers_1.baseURL}/users/login`)
            .send(helpers_1.userLoginCredential);
        expect(response.status).toBe(200);
    }));
    it("should return an error if user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        prismaClient_1.prisma.user.findUnique.mockResolvedValue(null);
        const response = yield request
            .post(`${helpers_1.baseURL}/users/login`)
            .send(helpers_1.userLoginCredential);
        expect(response.status).toBe(401);
    }));
    it("should return an error if password is incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
        prismaClient_1.prisma.user.findUnique.mockResolvedValue(helpers_1.newLoginUser);
        const mockComparePassword = jest.fn().mockResolvedValue(false);
        helpers_1.Password.comparePassword = mockComparePassword;
        const response = yield request
            .post(`${helpers_1.baseURL}/users/login`)
            .send(helpers_1.userLoginCredential);
        expect(response.status).toBe(401);
    }));
});
