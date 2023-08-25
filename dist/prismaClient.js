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
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const helpers_1 = require("./helpers");
const logger_1 = __importDefault(require("./logger"));
const prismaClient = new client_1.PrismaClient({
    log: [
        { level: "error", emit: "event" },
        { level: "query", emit: "event" },
    ],
    errorFormat: "pretty",
});
// intercept and hash passwords before save
prismaClient.$use((params, next) => __awaiter(void 0, void 0, void 0, function* () {
    if ((params.model == "User") &&
        (params.action == "create" || params.action == "update")) {
        logger_1.default.info({ data: params.args.data });
        if (params.args.data.password) {
            const hashedPassword = yield helpers_1.Password.toHash(params.args.data.password);
            params.args["data"] = Object.assign(Object.assign({}, params.args.data), { password: hashedPassword });
        }
        else {
            params.args["data"] = Object.assign({}, params.args.data);
        }
    }
    return next(params);
}));
prismaClient.$on("query", (e) => logger_1.default.info(e));
prismaClient.$on("error", (e) => logger_1.default.error(e));
exports.prisma = prismaClient;
