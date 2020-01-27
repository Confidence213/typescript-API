import { Router, Request, Response } from "express";

const router = Router();

router.post("token", (req: Request, res: Response) => {
  res.json({
    message: "issue token here"
  });
});

router.post("register", (req: Request, res: Response) => {
  res.json({
    message: "issue token here"
  });
});

export default router;
