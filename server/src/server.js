import express from "express";
import cors from "cors";
import { ENV } from "./config/environment.js";
import { connectDB } from "./config/db.js";
import apiRoutes from "./routes/api.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import { apiLogger } from "./middleware/apiLogger.js";
import { logger } from "./utils/logger.js";

// Initialize MongoDB connection
connectDB();

const app = express();

// Parse configured origins (supports comma-separated list)
const configuredOrigins = (ENV.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Dynamic CORS configuration supporting multi-origin and development ports
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, Postman, server-to-server)
    if (!origin) return callback(null, true);

    // Check if origin matches configured origins
    if (configuredOrigins.includes(origin)) {
      return callback(null, true);
    }

    // In development or local environments, allow any localhost or 127.0.0.1 port (e.g. 5173, 5174, 5175, 3000)
    if (
      ENV.NODE_ENV !== "production" &&
      /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
    ) {
      return callback(null, true);
    }

    return callback(new Error(`Not allowed by CORS: ${origin}`), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
};

// Security & Parsing Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request ID & API Logging Middleware (Colorized console & persistent log files)
app.use(apiLogger);

// Welcome root ping
app.get("/", (req, res) => {
  res.json({
    name: "Custom Setup MERN API",
    version: "1.0.0",
    description: "Production-ready MERN boilerplate API",
    health: "/api/health",
  });
});

// API Routes
app.use("/api", apiRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Process-level unhandled exception logging
process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Promise Rejection:", reason);
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
});

// Start server
app.listen(ENV.PORT, () => {
  logger.info(
    `🚀 Server running in ${ENV.NODE_ENV} mode on http://localhost:${ENV.PORT}`,
  );
  logger.info(`📝 API logs are saved to server/logs/ (access.log, error.log, combined.log)`);
});

export default app;
