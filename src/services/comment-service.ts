import { Comment } from "@prisma/client";
import { prisma } from "../prismaClient";

export const addCommentToPostService = async (data: {
  content: string;
  userId: string;
  postId: string;
}): Promise<Comment | null> => {
  return await prisma.comment.create({
    data,
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      post: {
        select: {
          id: true,
          content: true,
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });
};
