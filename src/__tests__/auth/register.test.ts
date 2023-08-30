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
        findUnique: jest.fn(),
        findMany: jest.fn(),
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

beforeEach(() => {
  (prisma.user.findUnique as jest.Mock).mockClear();
  (prisma.user.create as jest.Mock).mockClear();
  (prisma.user.findMany as jest.Mock).mockClear();
  (redisClient.set as jest.Mock).mockClear();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Register User Controller", () => {
  it("should register a new user", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.user.create as jest.Mock).mockResolvedValue(resolvedNewUser);
    (redisClient.set as jest.Mock).mockResolvedValue(null);

    const response = await request
      .post(`${baseURL}/users/register-user`)
      .send(newUser);

    expect(response.status).toBe(201);
    expect(redisClient.set).toHaveBeenCalled();
    expect(prisma.user.create).toHaveBeenCalled();
    expect(prisma.user.findUnique).toHaveBeenCalled();
  });

  it("should return an error if user already exists", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(resolvedNewUser);

    const response = await request
      .post(`${baseURL}/users/register-user`)
      .send(newUser)
      .expect(409);

    const { errors } = response.body;
    expect(response.status).toBe(409);
    expect(errors[0].message).toBe("User already exists");
  });
});
