import supertest from "supertest";
import app from "../../app";
import { baseURL, currentUser, resolvedNewUser } from "../../helpers";
import { prisma } from "../../prismaClient";
import { redisClient } from "../../redis";
import { NextFunction, Request, Response } from "express";
import { currentUserMiddleware } from "../../middleware";

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
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Get Users Controller", () => {
  it("should get all users when there is a bearer token", async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue([resolvedNewUser]);
    (redisClient.get as jest.Mock).mockResolvedValue(null);
    const response = await request.get(`${baseURL}/users`);

    expect(response.status).toBe(200);
    expect(redisClient.get).toHaveBeenCalled();
  });
});
