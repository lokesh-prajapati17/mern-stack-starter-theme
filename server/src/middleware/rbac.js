import { HTTP_STATUS } from "../constants/httpStatus.js";
import { sendError } from "../utils/apiResponse.js";

/**
 * Role-Based Access Control (RBAC) Guard Middleware
 * Usage: checkRole('Admin', 'Manager')
 * @param  {...string} allowedRoles
 */
export const checkRole = (...allowedRoles) => {
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
