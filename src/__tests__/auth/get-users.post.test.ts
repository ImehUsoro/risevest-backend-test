import supertest from "supertest";
import app from "../../app";
import { baseURL, newUser, resolvedNewUser } from "../../helpers";
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
      $disconnect: jest.fn(),
    })),
  };
});

beforeEach(() => {
  (prisma.user.findMany as jest.Mock).mockClear();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Get Users Controller", () => {
  it("should get all users", async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue([resolvedNewUser]);
    const response = await request.get(`${baseURL}/users`);
    expect(response.status).toBe(200);
  });
});
