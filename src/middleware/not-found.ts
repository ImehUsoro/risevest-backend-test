import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import Logger from "../logger";

export const notFound: RequestHandler = (req, res) => {
  const message = "Route does not exist";
  Logger.error(message);
  return res.status(StatusCodes.NOT_FOUND).json({ message });
};
