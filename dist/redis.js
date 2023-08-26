"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
// check if we're in production or not
let redisClient;
if (process.env.NODE_ENV === "production") {
    const redisClient = (0, redis_1.createClient)({
        url: "redis://red-cjl7hs0cfp5c73ffhgg0:6379",
    });
}
else {
    const redisClient = (0, redis_1.createClient)();
}
exports.default = redisClient;
