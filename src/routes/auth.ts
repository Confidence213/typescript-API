import { Router, Request, Response } from "express";

const router = Router();

/** Controller */
import AuthController from "../controllers/AuthController";

router.post("/token", AuthController.authenticate);
router.post("/register", AuthController.register);

export default router;
