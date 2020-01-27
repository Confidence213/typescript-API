import app from "./app";
import { PORT } from "./constants/app.constant";
import "reflect-metadata";
import { createConnection } from "typeorm";

createConnection()
  .then(async connection => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch(error => console.log(error));
