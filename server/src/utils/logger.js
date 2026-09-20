const { ENV } = require("../config/environment");

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

const logger = {
  info: (message, ...args) => {
    const timestamp = getTimestamp();
    const detail = args.length ? " " + formatArgs(args) : "";
    console.log(
      `${COLORS.dim}[${timestamp}]${COLORS.reset} ${COLORS.cyan}${COLORS.bold}[INFO]${COLORS.reset}  ${message}${detail}`,
    );
  },

  http: (message, ...args) => {
    const timestamp = getTimestamp();
    const detail = args.length ? " " + formatArgs(args) : "";
    console.log(
      `${COLORS.dim}[${timestamp}]${COLORS.reset} ${COLORS.magenta}${COLORS.bold}[HTTP]${COLORS.reset}  ${message}${detail}`,
    );
  },

  warn: (message, ...args) => {
    const timestamp = getTimestamp();
    const detail = args.length ? " " + formatArgs(args) : "";
    console.warn(
      `${COLORS.dim}[${timestamp}]${COLORS.reset} ${COLORS.yellow}${COLORS.bold}[WARN]${COLORS.reset}  ${message}${detail}`,
    );
  },

  error: (message, ...args) => {
    const timestamp = getTimestamp();
    const detail = args.length ? " " + formatArgs(args) : "";
    console.error(
      `${COLORS.dim}[${timestamp}]${COLORS.reset} ${COLORS.red}${COLORS.bold}[ERROR]${COLORS.reset} ${message}${detail}`,
    );
  },

  debug: (message, ...args) => {
    if (ENV.NODE_ENV === "production") return;
    const timestamp = getTimestamp();
    const detail = args.length ? " " + formatArgs(args) : "";
    console.debug(
      `${COLORS.dim}[${timestamp}]${COLORS.reset} ${COLORS.gray}${COLORS.bold}[DEBUG]${COLORS.reset} ${message}${detail}`,
    );
  },
};

module.exports = {
  logger,
};
