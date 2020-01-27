import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";

/** Routes */
import ApiRoute from "./routes/ApiRoute";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config() {
    //Allows us to receive requests with data in json format
    this.app.use(bodyParser.json({ limit: "50mb" }));

    //Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

    //Enables cors
    this.app.use(cors());

    this.app.use(helmet());
  }

  private routes() {
    this.app.use("/api", ApiRoute);
  }
}

export default new App().app;
