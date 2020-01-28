import { Router, Request, Response } from "express";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

/** Controller */
import AuthController from "../controllers/AuthController";

router.post("/token", AuthController.authenticate);
router.post("/register", AuthController.register);
router.get("/me", [checkJwt], AuthController.me);

export default router;
