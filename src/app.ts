import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import rateLimiter from "express-rate-limit";
import { StatusCodes } from "http-status-codes";
import Logger from "./logger";
import { errorHandlerMiddleware, notFound } from "./middleware";
import { applicationRoutes } from "./routes";

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

// app.use(dbErrors);
app.use(errorHandlerMiddleware);

export default app;
