import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";
import { successResponse } from "../helpers";
import { redisClient } from "../redis";
import {
  findUserPostsService
} from "../services/auth-service";
import { addCommentToPostService } from "../services/comment-service";
import { createPostService, findPostService } from "../services/post-service";

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
    await redisClient.set(cacheKey, JSON.stringify(userPosts));

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

    const post = await findPostService(postId);
    if (!post) throw new NotFoundError("Post not found");

    const comment = await addCommentToPostService({
      content,
      userId: req.currentUser!.id,
      postId,
    });

    // update the owner of the post's redis cache
    const authorPosts = await findUserPostsService(post.userId);

    const cacheKey = `user:${post.userId}`;
    await redisClient.set(cacheKey, JSON.stringify(authorPosts));

    return successResponse(res, StatusCodes.CREATED, comment);
  } catch (error) {
    next(error);
  }
};
