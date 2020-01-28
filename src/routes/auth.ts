import { Router, Request, Response } from "express";

const router = Router();

/** Controller */
import AuthController from "../controllers/AuthController";

router.post("/token", (req: Request, res: Response) => {
  res.json({
    message: "issue token here"
  });
});

router.post("/register", AuthController.register);

export default router;
