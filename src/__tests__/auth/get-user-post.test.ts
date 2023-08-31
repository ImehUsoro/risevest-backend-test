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
        findUnique: jest.fn(),
      },
      post: {
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

describe("Get User Posts Controller", () => {
  it("should return a 404 if user does not exist", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(false);

    const response = await request.get(`${baseURL}/users/1/posts`);

    const { errors } = response.body;
    expect(response.status).toBe(404);
    expect(errors[0].message).toBe("User not found");
  });

  it("should call the redis set method and return a 200 if all is okay", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(true);

    const response = await request.get(`${baseURL}/users/1/posts`);

    expect(response.status).toBe(200);
    expect(redisClient.get).toHaveBeenCalled();
  });
});
