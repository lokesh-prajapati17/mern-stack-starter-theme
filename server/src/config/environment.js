const dotenv = require("dotenv");

dotenv.config();

const ENV = {
  PORT: process.env.PORT || 5005,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL:
    process.env.CLIENT_URL ||
    "http://localhost:5173,http://localhost:5174,http://localhost:5175",
  MONGO_URI:
    process.env.MONGO_URI || "mongodb://localhost:27017/custom_setup_mern",
  JWT_SECRET: process.env.JWT_SECRET || "fallback_secret_key_change_me",
  JWT_EXPIRE: process.env.JWT_EXPIRE || "15m",
  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret_change_me",
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || "7d",
};

module.exports = {
  ENV,
};
