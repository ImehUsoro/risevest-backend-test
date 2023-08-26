import { createClient } from "redis";

// check if we're in production or not
let redisClient;
if (process.env.NODE_ENV === "production") {
  const redisClient = createClient({
    url: "redis://red-cjl7hs0cfp5c73ffhgg0:6379",
  });
} else {
  const redisClient = createClient();
}

export default redisClient;
