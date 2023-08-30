import { NextFunction, Request, Response } from "express";
import supertest from "supertest";
import app from "../../app";
import { baseURL, currentUser } from "../../helpers";
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
      },
      comment: {
        findFirst: jest.fn(),
      },
      $disconnect: jest.fn(),
    })),
  };
});

jest.mock("redis", () => {
  return {
    createClient: jest.fn(() => ({
      set: jest.fn(),
      get: jest.fn(),
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
  (redisClient.get as jest.Mock).mockClear();
  (currentUserMiddleware as jest.Mock).mockClear();
  (prisma.comment.findFirst as jest.Mock).mockClear();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Get Top Users Controller", () => {
  it("should get top three users with latest comment when there is a bearer token", async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue([currentUser]);
    (prisma.comment.findFirst as jest.Mock).mockResolvedValue({
      currentUser,
      latestComment: "latest comment",
    });

    const response = await request.get(`${baseURL}/users/top-three`);

    expect(response.status).toBe(200);
  });
});
