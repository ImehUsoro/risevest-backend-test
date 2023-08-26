"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const redis_1 = require("redis");
// export const redisClient = createClient({
//   url: "redis://redis:6379",
// });
exports.redisClient = (0, redis_1.createClient)();
