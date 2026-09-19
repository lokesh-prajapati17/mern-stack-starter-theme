import { HTTP_STATUS } from "../constants/httpStatus.js";
import { ENV } from "../config/environment.js";
import { logger } from "../utils/logger.js";

/**
 * Handle 404 Not Found for non-existing endpoints
 */
export const notFound = (req, res, next) => {
  const error = new Error(
    `Resource Not Found - [${req.method}] ${req.originalUrl}`,
  );
  res.status(HTTP_STATUS.NOT_FOUND);
  next(error);
};

/**
 * Central Error Handler Middleware
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== HTTP_STATUS.OK
      ? res.statusCode
      : err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

  const reqInfo = `[${req.method}] ${req.originalUrl} - IP: ${req.ip || req.socket?.remoteAddress} [ReqID: ${req.id || "-"}]`;

  // Log 5xx errors as ERROR with stack trace, 4xx as WARN
  if (statusCode >= HTTP_STATUS.INTERNAL_SERVER_ERROR) {
    logger.error(`${statusCode} ${err.message} (${reqInfo})`, err.stack || "");
  } else {
    logger.warn(`${statusCode} ${err.message} (${reqInfo})`);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    requestId: req.id || null,
    errors: err.errors || null,
    stack: ENV.NODE_ENV === "production" ? null : err.stack,
  });
};

