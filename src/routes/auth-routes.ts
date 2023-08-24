import { Router } from "express";
import {
  getUserController,
  getUsersController,
  loginController,
  registerUserController,
} from "../controllers/auth-controller";
import { validateRequestMiddleware } from "../helpers/validate-request";
import { loginUserSchema, registerUserSchema } from "../schemas";
import { currentUserMiddleware } from "../middleware";

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
router.route("/users").get(getUsersController);

//Get a user
router.route("/users/:id/posts").get(getUserController);

export { router as authenticationRoutes };
