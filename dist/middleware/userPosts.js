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
exports.getUserPostCache = void 0;
const redis_1 = require("../redis");
const helpers_1 = require("../helpers");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../logger"));
const getUserPostCache = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cacheKey = `user:${id}`;
    try {
        const cachedData = yield redis_1.redisClient.get(cacheKey);
        if (cachedData) {
            logger_1.default.info("Serving from cache");
            const data = JSON.parse(cachedData);
            return (0, helpers_1.successResponse)(res, http_status_codes_1.StatusCodes.OK, data);
        }
        else {
            next();
        }
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getUserPostCache = getUserPostCache;
