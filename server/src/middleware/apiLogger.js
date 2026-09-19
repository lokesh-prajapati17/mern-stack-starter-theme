import morgan from "morgan";
import crypto from "crypto";
import { logger } from "../utils/logger.js";
import { ENV } from "../config/environment.js";

// ANSI colors for console styling
const COLORS = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
};

/**
 * Color-code HTTP Methods for terminal display
 */
const colorMethod = (method) => {
  switch (method) {
    case "GET":
      return `${COLORS.green}${COLORS.bold}${method}${COLORS.reset}`;
    case "POST":
      return `${COLORS.yellow}${COLORS.bold}${method}${COLORS.reset}`;
    case "PUT":
    case "PATCH":
      return `${COLORS.blue}${COLORS.bold}${method}${COLORS.reset}`;
    case "DELETE":
      return `${COLORS.red}${COLORS.bold}${method}${COLORS.reset}`;
    default:
      return `${COLORS.cyan}${COLORS.bold}${method}${COLORS.reset}`;
  }
};

/**
 * Color-code HTTP Status Codes for terminal display
 */
const colorStatus = (status) => {
  const code = parseInt(status, 10);
  if (code >= 500) return `${COLORS.red}${COLORS.bold}${code}${COLORS.reset}`;
  if (code >= 400) return `${COLORS.yellow}${COLORS.bold}${code}${COLORS.reset}`;
  if (code >= 300) return `${COLORS.cyan}${code}${COLORS.reset}`;
  if (code >= 200) return `${COLORS.green}${code}${COLORS.reset}`;
  return `${COLORS.reset}${code}${COLORS.reset}`;
};

// Register custom Morgan tokens
morgan.token("req-id", (req) => req.id || "-");
morgan.token("client-ip", (req) => {
  return (
    req.headers["x-forwarded-for"] ||
    req.socket?.remoteAddress ||
    req.ip ||
    "-"
  );
});

// Custom Morgan token for colorized console output
morgan.token("color-method", (req) => colorMethod(req.method));
morgan.token("color-status", (req, res) => colorStatus(res.statusCode));

/**
 * Middleware to assign a unique Request ID (X-Request-Id) to each incoming request
 */
export const requestIdMiddleware = (req, res, next) => {
  const requestId =
    req.headers["x-request-id"] ||
    req.headers["x-correlation-id"] ||
    crypto.randomUUID();

  req.id = requestId;
  res.setHeader("X-Request-Id", requestId);
  next();
};

/**
 * Sanitize sensitive fields from payloads for safe terminal logging
 */
const sanitizePayload = (obj) => {
  if (!obj || typeof obj !== "object") return null;
  if (Array.isArray(obj)) return obj.map(sanitizePayload);

  const sensitive = ["password", "token", "refreshtoken", "secret", "authorization", "key"];
  const copy = {};
  for (const [key, value] of Object.entries(obj)) {
    if (sensitive.includes(key.toLowerCase())) {
      copy[key] = "***";
    } else if (typeof value === "object" && value !== null) {
      copy[key] = sanitizePayload(value);
    } else {
      copy[key] = value;
    }
  }
  return copy;
};

/**
 * Immediate Route Hit Logger Middleware
 * Logs route arrival instantly with method, path, IP, and sanitized payload
 */
export const routeHitLogger = (req, res, next) => {
  const startTime = Date.now();
  const reqId = req.id ? req.id.substring(0, 8) : "-";
  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket?.remoteAddress ||
    req.ip ||
    "-";
  const fullUrl = req.originalUrl || req.url;

  // Format query params if any
  const hasQuery = req.query && Object.keys(req.query).length > 0;
  const queryStr = hasQuery ? ` | Query: ${JSON.stringify(req.query)}` : "";

  // Format request body if any (sanitized)
  const hasBody =
    ["POST", "PUT", "PATCH", "DELETE"].includes(req.method) &&
    req.body &&
    Object.keys(req.body).length > 0;
  const bodyStr = hasBody
    ? ` | Body: ${JSON.stringify(sanitizePayload(req.body))}`
    : "";

  // 1. Log route hit immediately when request arrives
  logger.info(
    `🎯 [ROUTE HIT] ${colorMethod(req.method)} ${fullUrl} - IP: ${ip} [ReqID: ${reqId}]${queryStr}${bodyStr}`,
  );

  // 2. Log route completion when response finishes
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const statusBadge = colorStatus(res.statusCode);
    const logLine = `🏁 [ROUTE DONE] ${colorMethod(req.method)} ${fullUrl} ${statusBadge} (${duration}ms) [ReqID: ${reqId}]`;

    if (res.statusCode >= 500) {
      logger.error(logLine);
    } else if (res.statusCode >= 400) {
      logger.warn(logLine);
    } else {
      logger.info(logLine);
    }
  });

  next();
};

/**
 * File Logger Format (Plain Text ISO + Structured)
 */
const fileLogFormat =
  ':date[iso] [:req-id] :client-ip ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms';

// Morgan instance to write ALL access logs to server/logs/access.log
const accessFileLogger = morgan(fileLogFormat, {
  stream: {
    write: (message) => {
      logger.streams.access.write(message);
      logger.streams.combined.write(message);
    },
  },
});

// Morgan instance to write error requests (4xx / 5xx) to server/logs/error.log
const errorFileLogger = morgan(fileLogFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: {
    write: (message) => {
      logger.streams.error.write(message);
    },
  },
});

/**
 * Combined API Logger middleware
 */
export const apiLogger = [
  requestIdMiddleware,
  routeHitLogger,
  accessFileLogger,
  errorFileLogger,
];

export default apiLogger;
