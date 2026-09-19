import mongoose from "mongoose";
import { ENV } from "./environment.js";
import { logger } from "../utils/logger.js";

/**
 * Connect to MongoDB database
 */
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    logger.info(
      `📦 MongoDB Connected: ${conn.connection.host} / ${conn.connection.name}`,
    );
  } catch (error) {
    logger.warn(`⚠️ MongoDB Connection Error: ${error.message}`);
    logger.info(
      "ℹ️ Running in memory / offline mode until MongoDB connection is established.",
    );
  }
};

mongoose.connection.on("disconnected", () => {
  logger.warn("⚠️ MongoDB disconnected.");
});

mongoose.connection.on("reconnected", () => {
  logger.info("✅ MongoDB reconnected.");
});
