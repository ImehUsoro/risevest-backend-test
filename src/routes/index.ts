import { Router } from "express";
import { authenticationRoutes } from "./auth-routes";
import { postRoutes } from "./post-routes";

const router = Router();

router.use("/auth", authenticationRoutes);
router.use("/post", postRoutes);
router.use("/comment", authenticationRoutes);

export { router as applicationRoutes };
