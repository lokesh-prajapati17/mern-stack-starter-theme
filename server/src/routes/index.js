const express = require("express");
const authModule = require("./auth");
const userModule = require("./user");
const { authLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "online",
    service: "Custom Setup MERN Backend API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || "development",
  });
});

router.use("/auth", authLimiter, authModule.routes);
router.use("/users", userModule.routes);

module.exports = router;
