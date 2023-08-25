import { Router } from "express";
import {
  getTopUserPostWithLatestCommentController,
  getUserController,
  getUsersController,
  loginController,
  registerUserController,
} from "../controllers/auth-controller";
import { validateRequestMiddleware } from "../helpers/validate-request";
import { loginUserSchema, registerUserSchema } from "../schemas";
import { currentUserMiddleware } from "../middleware";
import { getUserPostCache } from "../middleware/redis/userPosts";
import { getCachedUsers } from "../middleware/redis/user";

const router = Router();

router
  .route("/register-user")
  .post(registerUserSchema, validateRequestMiddleware, registerUserController);
router
  .route("/login")
  .post(loginUserSchema, validateRequestMiddleware, loginController);

// protected routes
router.use(currentUserMiddleware);

//Get all users
router.route("/").get(getCachedUsers, getUsersController);

//Get a user
router.route("/:id/posts").get(getUserPostCache, getUserController);

// Get Users With The Top 3 Most Posts And Their Latest Comment
router.route("/top-three").get(getTopUserPostWithLatestCommentController);

export { router as authenticationRoutes };
