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
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./logger"));
const http_1 = require("http");
const client_1 = require("./client");
const PORT = process.env.PORT || 5001;
// start the express app
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT must be defined");
    }
    try {
        yield client_1.prisma.$connect();
        logger_1.default.info("connected to the database");
        const httpServer = (0, http_1.createServer)(app_1.default);
        httpServer.listen(PORT, () => {
            logger_1.default.info(`Server started on port ${PORT}`);
        });
    }
    catch (err) {
        console.log("=========> we're here");
        logger_1.default.error(err);
        yield client_1.prisma.$disconnect();
        process.exit(1);
    }
});
start();
