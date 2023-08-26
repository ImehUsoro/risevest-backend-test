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
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const child_process_1 = require("child_process");
const path_1 = require("path");
const url_1 = require("url");
const uuid_1 = require("uuid");
const helpers_1 = require("../helpers");
const generateDatabaseURL = (schema) => {
    if (!process.env.DATABASE_URL) {
        throw new Error("please provide a database url");
    }
    const url = new url_1.URL(process.env.DATABASE_URL);
    url.searchParams.append("schema", schema);
    return url.toString();
};
const schemaId = `test-${(0, uuid_1.v4)()}`;
const prismaBinary = (0, path_1.join)(__dirname, "..", "..", "node_modules", ".bin", "prisma");
const url = generateDatabaseURL(schemaId);
process.env.DATABASE_URL = url;
exports.prisma = new client_1.PrismaClient({
    datasources: { db: { url } },
});
beforeAll(() => {
    // intercept and hash passwords before save
    exports.prisma.$use((params, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (params.model == "User" && params.action == "create") {
            const hashedPassword = yield helpers_1.Password.toHash(params.args.data.password);
            params.args["data"] = Object.assign(Object.assign({}, params.args.data), { password: hashedPassword });
        }
        return next(params);
    }));
});
beforeEach(() => {
    (0, child_process_1.execSync)(`${prismaBinary} db push`, {
        env: Object.assign(Object.assign({}, process.env), { DATABASE_URL: generateDatabaseURL(schemaId) }),
    });
});
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`);
    yield exports.prisma.$disconnect();
}));
