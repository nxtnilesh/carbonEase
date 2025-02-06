import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connect = async () => {
  try {
    // console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info("MongoDb connected");
  } catch (error) {
    logger.error("MongoDb error", error);
    process.exit(1);
  }
};

export default connect;
