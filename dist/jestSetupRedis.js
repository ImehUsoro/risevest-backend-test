"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRedisMocks = void 0;
const redis_1 = require("./redis");
const setupRedisMocks = () => {
    jest.mock("redis", () => {
        return {
            createClient: jest.fn(() => ({
                set: jest.fn(),
            })),
        };
    });
    beforeEach(() => {
        redis_1.redisClient.set.mockClear();
        redis_1.redisClient.get.mockClear();
    });
};
exports.setupRedisMocks = setupRedisMocks;
