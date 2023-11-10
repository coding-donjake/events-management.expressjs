import * as dotenv from "dotenv";
import express from "express";
import router from "./router";

const expressApp = express();

expressApp.use(express.json());
expressApp.use(router);

dotenv.config();

const port = process.env.PORT || 5001;
expressApp.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
