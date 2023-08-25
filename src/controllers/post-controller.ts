import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors";
import { createPostService, findPostService } from "../services/post-service";
import { successResponse } from "../helpers";
import { addCommentToPostService } from "../services/comment-service";
import { findUserPostsService } from "../services/auth-service";
import { redisClient } from "../redis";

export const createPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content } = req.body;

    const post = await createPostService(content, req.currentUser!.id);

    const userPosts = await findUserPostsService(req.currentUser!.id);

    const cacheKey = `user:${req.currentUser!.id}`;
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(userPosts));

    return successResponse(res, StatusCodes.CREATED, post);
  } catch (error) {
    next(error);
  }
};

export const addCommentToPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    const post = findPostService(postId);

    if (!post) throw new NotFoundError("Post not found");

    const comment = await addCommentToPostService({
      content,
      userId: req.currentUser!.id,
      postId,
    });

    return successResponse(res, StatusCodes.CREATED, comment);
  } catch (error) {
    next(error);
  }
};

export const getPostsController = async (req: Request, res: Response) => {};

export const getPostController = async (req: Request, res: Response) => {};

export const updatePostController = async (req: Request, res: Response) => {};

export const deletePostController = async (req: Request, res: Response) => {};
