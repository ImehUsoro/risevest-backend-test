import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors";
import Logger from "../logger";

export const errorHandlerMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Server related errors
  if (err instanceof CustomError) {
    Logger.error(err.serializeErrors());
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  Logger.error({ err });

  // Prisma related errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002")
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: [{ message: "Unique constraint" }] });

    if (err.code === "P2025")
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: [{ message: err.meta?.cause }] });

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errors: [{ message: "Something went wrong" }] });
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errors: [{ message: "please fill out all fields" }] });
  }

  // Other uncaught errors
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: [{ message: err.message }],
  });
};

export const dbErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res
      .status(400)
      .json({ error: "Prisma client request error", message: err.message });
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    console.error("Unknown Prisma error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
  next(err);
};
