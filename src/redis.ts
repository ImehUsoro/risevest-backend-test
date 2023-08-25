import { createClient } from "redis";

export const redisClient = createClient({
  url: "redis://redis:6379",
});

// export const redisClient = createClient();
