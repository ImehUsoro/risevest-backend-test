"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisMock = exports.prismaMock = void 0;
// jest.mock("./prismaClient.ts");
const jest_mock_extended_1 = require("jest-mock-extended");
const redis_1 = require("redis");
exports.prismaMock = (0, jest_mock_extended_1.mockDeep)();
beforeEach(() => {
    (0, jest_mock_extended_1.mockReset)(exports.prismaMock);
});
const redisClient = (0, redis_1.createClient)();
exports.redisMock = (0, jest_mock_extended_1.mockDeep)();
beforeEach(() => {
    (0, jest_mock_extended_1.mockReset)(exports.redisMock);
});
exports.default = exports.redisMock;
