import { Post, User } from "@prisma/client";
import { prisma } from "../client";
import { ReturnedUser } from "./auth-service";

export interface CreatePostData
  extends Omit<Post, "id" | "createdAt" | "updatedAt"> {}

export const createPostService = async (
  content: string,
  userId: string
): Promise<Post | null> => {
  const post = await prisma.post.create({ data: { content, userId } });

  return post;
};

export const findPostService = async (id: string): Promise<Post | null> => {
  return await prisma.post.findUnique({
    where: { id },
  });
};

export const getTopUsersWithLatestCommentsService = async (): Promise<any> => {
  try {
    const topUsersWithMostPosts = await prisma.user.findMany({
      take: 3,
      orderBy: {
        posts: {
          _count: "desc",
        },
      },
      include: {
        posts: true,
      },
    });

    const usersWithLatestComment = await Promise.all(
      topUsersWithMostPosts.map(async (user) => {
        const latestComment = await prisma.comment.findFirst({
          where: {
            userId: user.id,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return {
          user,
          latestComment,
        };
      })
    );

    return usersWithLatestComment;
  } catch (error) {
    console.log(error);
    return null;
  }
};
