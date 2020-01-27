import { Router } from "express";

/** Controllers */
import MainController from "../controllers/MainController";

class ApiRoute {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  public routes(): void {
    this.router.get("/", MainController.index);
  }
}

export default new ApiRoute().router;
