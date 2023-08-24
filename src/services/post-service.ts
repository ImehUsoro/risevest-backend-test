import { Post } from "@prisma/client";
import { prisma } from "../client";

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
