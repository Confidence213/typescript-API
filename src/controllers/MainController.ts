import { Request, Response } from "express";

class MainController {
  public index(req: Request, res: Response): Response {
    return res.json({
      message: "Application is up"
    });
  }
}

export default new MainController();
