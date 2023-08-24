import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { UserPayload } from "../typings";

export const currentUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer Token
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ Message: "Not Logged In" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;

    req.currentUser = payload;
  } catch (error) {
    console.log({ error });
    next(error);
  }
  next();
};
