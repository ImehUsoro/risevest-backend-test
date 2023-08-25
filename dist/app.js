"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("./logger"));
const middleware_1 = require("./middleware");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(function (req, _, next) {
    const requestMethod = req.method;
    const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    logger_1.default.info(`[ ${requestMethod} ] ${fullUrl}`);
    next();
});
app.use((0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 60,
    handler: (_, res) => {
        return res
            .status(http_status_codes_1.StatusCodes.TOO_MANY_REQUESTS)
            .json({ errors: [{ message: "Too many requests!" }] });
    },
}));
app.use("/api/v1", routes_1.applicationRoutes);
app.use(middleware_1.notFound);
// app.use(dbErrors);
app.use(middleware_1.errorHandlerMiddleware);
exports.default = app;
