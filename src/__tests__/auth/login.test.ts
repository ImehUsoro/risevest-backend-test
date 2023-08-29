import supertest from "supertest";

import app from "../../app";
import { prisma } from "../../prismaClient";
import {
  Password,
  baseURL,
  newLoginUser,
  userLoginCredential,
} from "../../helpers";

const request = supertest(app);

jest.mock("@prisma/client", () => {
  return {
    Password: jest.fn().mockImplementation(() => {
      return { comparePassword: jest.fn() };
    }),

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

beforeEach(() => {
  (prisma.user.findUnique as jest.Mock).mockClear();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Sign In User Controller", () => {
  it("should sign in a user", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(newLoginUser);
    const mockComparePassword = jest.fn().mockResolvedValue(true);
    Password.comparePassword = mockComparePassword;

    const response = await request
      .post(`${baseURL}/users/login`)
      .send(userLoginCredential);

    expect(response.status).toBe(200);
  });

  it("should return an error if user does not exist", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    const response = await request
      .post(`${baseURL}/users/login`)
      .send(userLoginCredential);

    expect(response.status).toBe(401);
  });

  it("should return an error if password is incorrect", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(newLoginUser);
    const mockComparePassword = jest.fn().mockResolvedValue(false);
    Password.comparePassword = mockComparePassword;

    const response = await request
      .post(`${baseURL}/users/login`)
      .send(userLoginCredential);

    expect(response.status).toBe(401);
  });
});
