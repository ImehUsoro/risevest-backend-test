import { User } from "@prisma/client";
import { prisma } from "../client";

export const registerUserService = async (
  email: string,
  password: string
) => {};

export const findUser = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
