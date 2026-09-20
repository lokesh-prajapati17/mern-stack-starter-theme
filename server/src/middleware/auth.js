const jwt = require("jsonwebtoken");
const { ENV } = require("../config/environment");
const { HTTP_STATUS } = require("../constants/httpStatus");
const { sendError } = require("../utils/apiResponse");

const verifyAuth = (req, res, next) => {
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

module.exports = {
  verifyAuth,
};
