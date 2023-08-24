import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import Logger from "./logger";
import { applicationRoutes } from "./routes";
import { errorHandlerMiddleware, notFound } from "./middleware";
import { StatusCodes } from "http-status-codes";
import rateLimiter from "express-rate-limit";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(function (req: Request, _: Response, next: NextFunction) {
  const requestMethod = req.method;
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  Logger.info(`[ ${requestMethod} ] ${fullUrl}`);
  next();
});

app.use(
  rateLimiter({
    windowMs: 60 * 1000,
    max: 60,
    handler: (_, res) => {
      return res
        .status(StatusCodes.TOO_MANY_REQUESTS)
        .json({ errors: [{ message: "Too many requests!" }] });
    },
  })
);

app.use("/api/v1", applicationRoutes);

app.use(notFound);

app.use(errorHandlerMiddleware);

export default app;
