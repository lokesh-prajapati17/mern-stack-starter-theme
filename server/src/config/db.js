const mongoose = require("mongoose");
const { ENV } = require("./environment");
const { logger } = require("../utils/logger");

const connectDB = async () => {
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

module.exports = {
  connectDB,
};
