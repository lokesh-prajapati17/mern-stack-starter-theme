import { HTTP_STATUS } from "../constants/httpStatus.js";

/**
 * Send standard standardized JSON success response
 */
export const sendSuccess = (
  res,
  data = null,
  message = "Operation successful",
  statusCode = HTTP_STATUS.OK,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Send standard standardized JSON error response
 */
export const sendError = (
  res,
  message = "An error occurred",
  statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  errors = null,
) => {
  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};
