import { Post, User } from "@prisma/client";
import { prisma } from "../prismaClient";

export interface CreateUserData
  extends Omit<User, "id" | "createdAt" | "updatedAt"> {}

export type ReturnedUser = Partial<Pick<User, "password">> &
  Omit<User, "password">;

export const registerUserService = async (
  data: CreateUserData
): Promise<ReturnedUser | null> => {
  const user = await prisma.user.create({ data });
  return user;
};

export const findUserService = async (
  email: string
): Promise<ReturnedUser | null> => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const findUserPostsService = async (
  id: string
): Promise<Post[] | null> => {
  return await prisma.post.findMany({
    where: { userId: id },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      comments: {
        select: {
          content: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });
};

export const findAllUsersService = async (): Promise<ReturnedUser[]> => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
