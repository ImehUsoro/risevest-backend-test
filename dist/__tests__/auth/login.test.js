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
// Buyer Login tests
describe("Signin a Buyer", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post(`${helpers_1.baseURL}/users/register-user`)
            .send({
            firstName: "Jane",
            lastName: "Doe",
            email: "Jane@doe.com",
            password: "JaneDoe123",
        })
            .expect(http_status_codes_1.StatusCodes.CREATED);
    }));
    it("should return 400 on invalid email", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post(`${helpers_1.baseURL}/users/login`)
            .send({
            email: "john",
            password: "johnDoe123",
        })
            .expect(http_status_codes_1.StatusCodes.BAD_REQUEST);
    }));
    it("should return 400 on incorrect credentials of buyer", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post(`${helpers_1.baseURL}/users/login`)
            .send({
            email: "john@doe.com",
            password: "johnDoe",
        })
            .expect(http_status_codes_1.StatusCodes.BAD_REQUEST);
    }));
});
