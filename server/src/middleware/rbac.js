const { HTTP_STATUS } = require("../constants/httpStatus");
const { sendError } = require("../utils/apiResponse");

const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(
        res,
        "Unauthorized. Please log in.",
        HTTP_STATUS.UNAUTHORIZED,
      );
    }

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return sendError(
        res,
        `Forbidden: Role '${userRole}' is not authorized to access this resource.`,
        HTTP_STATUS.FORBIDDEN,
      );
    }

    next();
  };
};

module.exports = {
  checkRole,
};
