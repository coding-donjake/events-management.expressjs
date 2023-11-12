import * as dotenv from "dotenv";
import express from "express";
import router from "./router";

const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(router);

dotenv.config();

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
