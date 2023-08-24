import { Router } from "express";

const router = Router();

router.route("/register-user").post((req, res) => {});
router.route("/login").post((req, res) => {});
router.route("/get-users").get((req, res) => {});
router.route("/get-user/:id").get((req, res) => {});
router.route("/update-user/:id").patch((req, res) => {});

export { router as authenticationRoutes };
