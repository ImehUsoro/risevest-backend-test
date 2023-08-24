import { Request } from "express";
import { BadRequestError } from "../errors";
import { UserPayload } from "../typings";
import jwt from "jsonwebtoken";

export const generateJWT = (req: Request, payload: UserPayload) => {
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days
  const userJWT = jwt.sign({ ...payload, exp }, process.env.JWT_SECRET!);

  return userJWT;
};

export const verifyJWT = (token: string) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new BadRequestError("Login to continue");
    } else {
      throw new BadRequestError("Invalid token");
    }
  }
};
