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
beforeEach(() => {
    prismaClient_1.prisma.user.findMany.mockClear();
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.prisma.$disconnect();
}));
describe("Get Users Controller", () => {
    it("should get all users", () => __awaiter(void 0, void 0, void 0, function* () {
        prismaClient_1.prisma.user.findMany.mockResolvedValue([helpers_1.resolvedNewUser]);
        const response = yield request.get(`${helpers_1.baseURL}/users`);
        expect(response.status).toBe(200);
    }));
});
