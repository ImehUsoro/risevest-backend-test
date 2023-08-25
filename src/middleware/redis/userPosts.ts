import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { successResponse } from "../../helpers";
import Logger from "../../logger";
import { redisClient } from "../../redis";

export const getUserPostCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const cacheKey = `user:${id}`;

  try {
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      Logger.info("Serving from cache");
      const data = JSON.parse(cachedData);
      return successResponse(res, StatusCodes.OK, data);
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
