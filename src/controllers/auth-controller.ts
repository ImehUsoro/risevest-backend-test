import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors";

export const registerUserController = async (req: Request, res: Response) => {};

export const loginController = async (req: Request, res: Response) => {};

export const getUsersController = async (req: Request, res: Response) => {};

export const getUserController = async (req: Request, res: Response) => {};

export const updateUserController = async (req: Request, res: Response) => {};
