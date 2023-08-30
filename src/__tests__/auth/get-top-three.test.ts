import supertest from "supertest";
import app from "../../app";
import { baseURL, currentUser, resolvedNewUser } from "../../helpers";
import { prisma } from "../../prismaClient";
import { redisClient } from "../../redis";
import { NextFunction, Request, Response } from "express";
import { currentUserMiddleware } from "../../middleware";
import e from "cors";

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
