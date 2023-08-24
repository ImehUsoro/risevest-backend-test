import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors";

export const createPostController = async (req: Request, res: Response) => {};

export const getPostsController = async (req: Request, res: Response) => {};

export const getPostController = async (req: Request, res: Response) => {};

export const updatePostController = async (req: Request, res: Response) => {};

export const deletePostController = async (req: Request, res: Response) => {};
