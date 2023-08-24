import { Router } from "express";

const router = Router();

router.route("/create").post((req, res) => {});
router.route("/").get((req, res) => {});
router.route("/get-single/:id").get((req, res) => {});
router.route("/update-single/:id").patch((req, res) => {});
router.route("/delete").delete((req, res) => {});

export { router as postRoutes };
