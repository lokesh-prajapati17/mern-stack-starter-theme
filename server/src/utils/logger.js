import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "../config/environment.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project root / server root logs directory
const LOG_DIR = path.resolve(__dirname, "../../logs");

// Ensure logs directory exists
if (!fs.existsSync(LOG_DIR)) {
  try {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  } catch (err) {
    console.error("Failed to create log directory:", err);
  }
}

// Log file paths
export const LOG_FILES = {
  COMBINED: path.join(LOG_DIR, "combined.log"),
  ERROR: path.join(LOG_DIR, "error.log"),
  ACCESS: path.join(LOG_DIR, "access.log"),
};

// Create write streams with append mode
const combinedStream = fs.createWriteStream(LOG_FILES.COMBINED, { flags: "a" });
const errorStream = fs.createWriteStream(LOG_FILES.ERROR, { flags: "a" });
const accessStream = fs.createWriteStream(LOG_FILES.ACCESS, { flags: "a" });

// ANSI Color Codes for terminal
const COLORS = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  gray: "\x1b[90m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
};

/**
 * Remove ANSI escape sequences for file persistence
 */
const stripAnsi = (str) => {
  return typeof str === "string"
    ? str.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, "")
    : String(str);
};

/**
 * Format timestamp in ISO-like local representation: YYYY-MM-DD HH:mm:ss.SSS
 */
const getTimestamp = () => {
  const now = new Date();
  const pad = (n, s = 2) => String(n).padStart(s, "0");
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());
  const ms = pad(now.getMilliseconds(), 3);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${ms}`;
};

/**
 * Write a formatted line to destination file
 */
const writeToFile = (stream, line) => {
  try {
    stream.write(stripAnsi(line) + "\n");
  } catch (err) {
    console.error("Failed to write to log stream:", err);
  }
};

/**
 * Format arguments into a single string
 */
const formatArgs = (args) => {
  return args
    .map((arg) => {
      if (arg instanceof Error) {
        return arg.stack || arg.message;
      }
      if (typeof arg === "object" && arg !== null) {
        try {
          return JSON.stringify(arg, null, 2);
        } catch {
          return String(arg);
        }
      }
      return String(arg);
    })
    .join(" ");
};

/**
 * Structured Application Logger
 */
export const logger = {
  info: (message, ...args) => {
    const timestamp = getTimestamp();
    const detail = args.length ? " " + formatArgs(args) : "";
    const consoleMsg = `${COLORS.dim}[${timestamp}]${COLORS.reset} ${COLORS.cyan}${COLORS.bold}[INFO]${COLORS.reset}  ${message}${detail}`;
    const plainMsg = `[${timestamp}] [INFO]  ${message}${detail}`;

    console.log(consoleMsg);
    writeToFile(combinedStream, plainMsg);
  },

  http: (message, ...args) => {
    const timestamp = getTimestamp();
    const detail = args.length ? " " + formatArgs(args) : "";
    const consoleMsg = `${COLORS.dim}[${timestamp}]${COLORS.reset} ${COLORS.magenta}${COLORS.bold}[HTTP]${COLORS.reset}  ${message}${detail}`;
    const plainMsg = `[${timestamp}] [HTTP]  ${message}${detail}`;

    console.log(consoleMsg);
    writeToFile(combinedStream, plainMsg);
  },

  warn: (message, ...args) => {
    const timestamp = getTimestamp();
    const detail = args.length ? " " + formatArgs(args) : "";
    const consoleMsg = `${COLORS.dim}[${timestamp}]${COLORS.reset} ${COLORS.yellow}${COLORS.bold}[WARN]${COLORS.reset}  ${message}${detail}`;
    const plainMsg = `[${timestamp}] [WARN]  ${message}${detail}`;

    console.warn(consoleMsg);
    writeToFile(combinedStream, plainMsg);
    writeToFile(errorStream, plainMsg);
  },

  error: (message, ...args) => {
    const timestamp = getTimestamp();
    const detail = args.length ? " " + formatArgs(args) : "";
    const consoleMsg = `${COLORS.dim}[${timestamp}]${COLORS.reset} ${COLORS.red}${COLORS.bold}[ERROR]${COLORS.reset} ${message}${detail}`;
    const plainMsg = `[${timestamp}] [ERROR] ${message}${detail}`;

    console.error(consoleMsg);
    writeToFile(combinedStream, plainMsg);
    writeToFile(errorStream, plainMsg);
  },

  debug: (message, ...args) => {
    if (ENV.NODE_ENV === "production") return;
    const timestamp = getTimestamp();
    const detail = args.length ? " " + formatArgs(args) : "";
    const consoleMsg = `${COLORS.dim}[${timestamp}]${COLORS.reset} ${COLORS.gray}${COLORS.bold}[DEBUG]${COLORS.reset} ${message}${detail}`;
    const plainMsg = `[${timestamp}] [DEBUG] ${message}${detail}`;

    console.debug(consoleMsg);
    writeToFile(combinedStream, plainMsg);
  },

  // Stream references for Morgan or external pipes
  streams: {
    combined: combinedStream,
    error: errorStream,
    access: accessStream,
  },
};

export default logger;
