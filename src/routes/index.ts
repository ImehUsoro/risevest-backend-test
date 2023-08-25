import { Router } from "express";
import { authenticationRoutes } from "./auth-routes";
import { postRoutes } from "./post-routes";
import { commentRoutes } from "./comment-routes";

const router = Router();

router.use("/users", authenticationRoutes);
router.use("/posts", postRoutes);
router.use("/comment", commentRoutes);

export { router as applicationRoutes };
