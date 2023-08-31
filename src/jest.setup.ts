import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      // url: process.env.DATABASE_URL_TEST,
    },
  },
});

global.beforeAll(async () => {
  await prisma.$connect();
});

global.afterAll(async () => {
  await prisma.$disconnect();
});

// Export the Prisma instance for your tests to use
export { prisma };
