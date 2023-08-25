import { createClient } from "redis";
import Logger from "./logger";

export const redisClient = createClient();
