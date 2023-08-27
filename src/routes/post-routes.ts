import { Router } from "express";
import {
  addCommentToPostController,
  createPostController,
} from "../controllers/post-controller";
import { validateRequestMiddleware } from "../helpers/validate-request";
import { currentUserMiddleware } from "../middleware";
import { addCommentSchema, addPostSchema } from "../schemas";

const router = Router();

router.use(currentUserMiddleware);

router
  .route("/create")
  .post(addPostSchema, validateRequestMiddleware, createPostController);

// Add a comment to post
router
  .route("/:postId/comments")
  .post(
    addCommentSchema,
    validateRequestMiddleware,
    addCommentToPostController
  );

export { router as postRoutes };
