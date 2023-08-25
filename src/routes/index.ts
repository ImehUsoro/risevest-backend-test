import { Router } from "express";
import { authenticationRoutes } from "./auth-routes";
import { postRoutes } from "./post-routes";

const router = Router();

router.use("/users", authenticationRoutes);
router.use("/posts", postRoutes);
router.use("/comment", authenticationRoutes);

export { router as applicationRoutes };
