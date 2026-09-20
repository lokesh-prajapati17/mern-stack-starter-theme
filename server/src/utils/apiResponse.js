const { HTTP_STATUS } = require("../constants/httpStatus");

const sendSuccess = (
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

const sendError = (
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

module.exports = {
  sendSuccess,
  sendError,
};
