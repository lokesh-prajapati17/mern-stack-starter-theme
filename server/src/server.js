const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { ENV } = require("./config/environment");
const { connectDB } = require("./config/db");
const apiRoutes = require("./routes");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const { apiLogger } = require("./middleware/apiLogger");
const { sanitizeBody } = require("./middleware/validator");

connectDB();

const app = express();

const configuredOrigins = (ENV.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (configuredOrigins.includes(origin)) {
      return callback(null, true);
    }

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

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeBody);
app.use(apiLogger);

app.get("/", (req, res) => {
  res.json({
    name: "Custom Setup MERN API",
    version: "1.0.0",
    description: "Production-ready MERN boilerplate API",
    health: "/api/health",
  });
});

app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Promise Rejection:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

app.listen(ENV.PORT, () => {
  console.log(
    `🚀 Server running in ${ENV.NODE_ENV} mode on http://localhost:${ENV.PORT}`,
  );
});

module.exports = app;
