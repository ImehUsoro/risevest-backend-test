import { NextFunction, Request, Response } from "express";
import supertest from "supertest";
import app from "../../app";
import {
  baseURL,
  createdComment,
  createdPost,
  currentUser,
  mockPost,
} from "../../helpers";
import { currentUserMiddleware } from "../../middleware";
import { prisma } from "../../prismaClient";
import { redisClient } from "../../redis";

const request = supertest(app);

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => ({
      $use: jest.fn(),
      $on: jest.fn(),
      PrismaClientKnownRequestError: jest.fn(),
      user: {
        findUnique: jest.fn(),
      },
      post: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
      },
      comment: {
        create: jest.fn(),
      },
      $disconnect: jest.fn(),
    })),
  };
});

jest.mock("redis", () => {
  return {
    createClient: jest.fn(() => ({
      set: jest.fn(),
    })),
  };
});

jest.mock("../../middleware/current-user.ts", () => {
  return {
    currentUserMiddleware: jest.fn(
      (req: Request, res: Response, next: NextFunction) => {
        req.currentUser = currentUser;
        next();
      }
    ),
  };
});

beforeEach(() => {
  (prisma.post.findUnique as jest.Mock).mockClear();
  (prisma.comment.create as jest.Mock).mockClear();
  (prisma.user.findUnique as jest.Mock).mockClear();
  (redisClient.set as jest.Mock).mockClear();
  (currentUserMiddleware as jest.Mock).mockClear();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Add Comment Controller", () => {
  it("should return a 404 if post does not exist", async () => {
    (prisma.post.findUnique as jest.Mock).mockResolvedValue(false);

    const response = await request.post(`${baseURL}/posts/1/comments`).send({
      content: "This is a comment",
    });

    const { errors } = response.body;

    expect(response.status).toBe(404);
    expect(errors[0].message).toBe("Post not found");
  });

  it("should return an error if no comment is passed", async () => {
    const response = await request.post(`${baseURL}/posts/1/comments`).send({});

    const { errors } = response.body;
    expect(response.status).toBe(400);
    expect(errors[0].msg).toBe("Content is required");
  });

  it("should add a new comment", async () => {
    (prisma.post.findUnique as jest.Mock).mockResolvedValue(mockPost);
    (prisma.post.findMany as jest.Mock).mockResolvedValue(null);
    (prisma.comment.create as jest.Mock).mockResolvedValue(createdComment);
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(currentUser);

    const response = await request.post(`${baseURL}/posts/1/comments`).send({
      content: "This is a comment",
    });

    expect(response.status).toBe(201);
    expect(redisClient.set).toHaveBeenCalled();
  });
});
