const rateLimit = require("express-rate-limit");
const { sendError } = require("../utils/apiResponse");
const { HTTP_STATUS } = require("../constants/httpStatus");

const isProduction = process.env.NODE_ENV === "production";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isProduction ? 25 : 100, // 25 attempts in production, 100 in development
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return sendError(
      res,
      "Too many attempts. Please try again after 15 minutes.",
      HTTP_STATUS.TOO_MANY_REQUESTS,
    );
  },
});

/**
 * Global API rate limiter to protect against excessive automated traffic
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 300 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return sendError(
      res,
      "Too many requests. Please slow down.",
      HTTP_STATUS.TOO_MANY_REQUESTS,
    );
  },
});

module.exports = {
  authLimiter,
  apiLimiter,
};
