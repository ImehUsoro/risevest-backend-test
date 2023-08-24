import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors";

export const createCommentController = async (
  req: Request,
  res: Response
) => {};

export const getCommentsController = async (req: Request, res: Response) => {};

export const getCommentController = async (req: Request, res: Response) => {};

export const updateCommentController = async (
  req: Request,
  res: Response
) => {};

export const deleteCommentController = async (
  req: Request,
  res: Response
) => {};
