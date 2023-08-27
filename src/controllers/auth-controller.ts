import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import { Password, successResponse } from "../helpers";
import { generateJWT } from "../helpers/jwt";
import { redisClient } from "../redis";

import {
  findAllUsersService,
  findUserPostsService,
  findUserService,
  registerUserService,
} from "../services/auth-service";
import { getTopUsersWithLatestCommentsService } from "../services/post-service";

export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const userExists = await findUserService(email);

    if (userExists) throw new BadRequestError("User already exists");

    const user = await registerUserService({
      firstName,
      lastName,
      email,
      password,
    });

    if (!user)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: [{ message: "User not created" }] });

    delete user.password;

    const users = await findAllUsersService();

    const cacheKey = "users";
    await redisClient.set(cacheKey, JSON.stringify(users));

    return successResponse(res, StatusCodes.CREATED, user);
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await findUserService(email);

    if (!user) throw new BadRequestError("Invalid credentials");

    const passwordMatch = await Password.comparePassword(
      password,
      user?.password!
    );

    if (!passwordMatch) throw new BadRequestError("Invalid credentials");

    const userJWT = generateJWT(req, {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    delete user.password;

    return successResponse(res, StatusCodes.OK, { user, token: userJWT });
  } catch (error) {
    next(error);
  }
};

export const getUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findAllUsersService();

    const cacheKey = "users";
    await redisClient.set(cacheKey, JSON.stringify(users));

    return successResponse(res, StatusCodes.OK, users);
  } catch (error) {
    next(error);
  }
};

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const userPosts = await findUserPostsService(id);

    if (!userPosts) throw new NotFoundError("User not found");

    const cacheKey = `user:${id}`;

    await redisClient.set(cacheKey, JSON.stringify(userPosts));

    return successResponse(res, StatusCodes.OK, userPosts);
  } catch (error) {
    next(error);
  }
};

export const getTopUserPostWithLatestCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getTopUsersWithLatestCommentsService();

    return successResponse(res, StatusCodes.OK, users);
  } catch (error) {
    next(error);
  }
};
