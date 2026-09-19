import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

// Health Check API
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

// Mount Sub-routers
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
