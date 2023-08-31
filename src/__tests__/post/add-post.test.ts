import { NextFunction, Request, Response } from "express";
import supertest from "supertest";
import app from "../../app";
import { baseURL, createdPost, currentUser } from "../../helpers";
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
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
      comment: {
        findFirst: jest.fn(),
      },
      post: {
        create: jest.fn(),
        findMany: jest.fn(),
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
  (prisma.user.findMany as jest.Mock).mockClear();
  (prisma.user.findUnique as jest.Mock).mockClear();
  (redisClient.set as jest.Mock).mockClear();
  (currentUserMiddleware as jest.Mock).mockClear();
  (prisma.comment.findFirst as jest.Mock).mockClear();
  (prisma.post.create as jest.Mock).mockClear();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Add Post Controller", () => {
  it("should add a new post", async () => {
    (prisma.post.create as jest.Mock).mockResolvedValue(createdPost);
    (prisma.post.findMany as jest.Mock).mockResolvedValue(null);
    (prisma.user.findUnique as jest.Mock).mockResolvedValue([currentUser]);

    const response = await request.post(`${baseURL}/posts/create`).send({
      content: "new post",
    });

    expect(response.status).toBe(201);
    expect(redisClient.set).toHaveBeenCalled();
  });

  it("should return an error if no content is passed", async () => {
    const response = await request.post(`${baseURL}/posts/create`).send({});

    const { errors } = response.body;
    expect(response.status).toBe(400);
    expect(errors[0].msg).toBe("Content is required");
  });
});
