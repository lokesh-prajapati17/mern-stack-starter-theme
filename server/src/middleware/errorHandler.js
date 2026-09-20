const { HTTP_STATUS } = require("../constants/httpStatus");
const { ENV } = require("../config/environment");

const notFound = (req, res, next) => {
  const error = new Error(
    `Resource Not Found - [${req.method}] ${req.originalUrl}`,
  );
  res.status(HTTP_STATUS.NOT_FOUND);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== HTTP_STATUS.OK
      ? res.statusCode
      : err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    requestId: req.id || null,
    errors: err.errors || null,
    stack: ENV.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
