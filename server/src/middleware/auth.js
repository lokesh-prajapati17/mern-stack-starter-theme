import jwt from "jsonwebtoken";
import { ENV } from "../config/environment.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { sendError } from "../utils/apiResponse.js";

/**
 * Verify JWT Access Token in Authorization header
 */
export const verifyAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendError(
      res,
      "Access denied. No authentication token provided.",
      HTTP_STATUS.UNAUTHORIZED,
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return sendError(
        res,
        "Token has expired. Please refresh your session.",
        HTTP_STATUS.UNAUTHORIZED,
      );
    }
    return sendError(
      res,
      "Invalid token. Authorization denied.",
      HTTP_STATUS.UNAUTHORIZED,
    );
  }
};
