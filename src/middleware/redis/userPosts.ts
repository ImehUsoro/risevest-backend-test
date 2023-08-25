import { Request, Response, NextFunction } from "express";
import { redisClient } from "../../redis";
import { successResponse } from "../../helpers";
import { StatusCodes } from "http-status-codes";
import Logger from "../../logger";

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
