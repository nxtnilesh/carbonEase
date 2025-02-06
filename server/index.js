import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./src/db/index.js";
import logger from "./src/utils/logger.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// import routes

import userRoute from "./src/routes/authRoute.js";

app.use("/api/auth", userRoute);

const PORT = process.env.PORT || 3000;
connect()
  .then(
    app.listen(PORT, () => {
      logger.info(`Server is running on ${PORT}`);
    })
  )
  .catch((err) => logger.error("MongoDB connect error", err));
