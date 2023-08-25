import app from "./app";
import Logger from "./logger";
import { createServer } from "http";
import { prisma } from "./prismaClient";
import { redisClient } from "./redis";

const PORT = process.env.PORT || 5001;

// start the express app
const start = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT must be defined");
  }
  try {
    await prisma.$connect();
    Logger.info("connected to the database");

    const httpServer = createServer(app);

    httpServer.listen(PORT, () => {
      Logger.info(`Server started on port ${PORT}`);
    });

    // redis connection
    redisClient.on("error", (err) => Logger.error("Redis Client Error", err));
    redisClient.on("connect", () => Logger.info("Redis Client Connected"));
    await redisClient.connect();
  } catch (err) {
    Logger.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();
