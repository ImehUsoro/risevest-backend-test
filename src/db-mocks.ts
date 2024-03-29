// // jest.mock("./prismaClient.ts");
// import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
// import { PrismaClient } from "@prisma/client";
// import { createClient } from "redis";

// export const prismaMock = mockDeep<PrismaClient>();

// beforeEach(() => {
//   mockReset(prismaMock);
// });

// const redisClient = createClient();
// export const redisMock = mockDeep<typeof redisClient>();

// beforeEach(() => {
//   mockReset(redisMock);
// });

// export default redisMock;

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  verbose: false,
  forceExit: true,
  setupFilesAfterEnv: ["./src/mocks.ts"],
};
