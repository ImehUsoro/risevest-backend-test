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
const http_status_codes_1 = require("http-status-codes");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const helpers_1 = require("../../helpers");
const request = (0, supertest_1.default)(app_1.default);
describe("Register user", () => {
    const data = {
        firstName: "Jane",
        lastName: "Doe",
        email: "Jane@doe.com",
        password: "JaneDoe123",
    };
    it("returns 400 with an invalid email", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post(`${helpers_1.baseURL}/users/register-user`)
            .send(Object.assign(Object.assign({}, data), { email: "Jane.com" }))
            .expect(http_status_codes_1.StatusCodes.BAD_REQUEST);
    }));
    it("disallows duplicate emails", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post(`${helpers_1.baseURL}/users/register-user`)
            .send(data)
            .expect(http_status_codes_1.StatusCodes.CREATED);
        yield request
            .post(`${helpers_1.baseURL}/users/register-user`)
            .send(data)
            .expect(http_status_codes_1.StatusCodes.BAD_REQUEST);
    }));
    it("returns 400 with fields being empty", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post(`${helpers_1.baseURL}/users/register-user`)
            .send({})
            .expect(http_status_codes_1.StatusCodes.BAD_REQUEST);
    }));
});
