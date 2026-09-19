import { HTTP_STATUS } from "../constants/httpStatus.js";
import { sendError } from "../utils/apiResponse.js";

/**
 * Validates that required fields exist in req.body
 * @param {string[]} requiredFields
 */
export const validateBody = (requiredFields = []) => {
  return (req, res, next) => {
    const missing = [];
    for (const field of requiredFields) {
      if (
        req.body[field] === undefined ||
        req.body[field] === null ||
        req.body[field] === ""
      ) {
        missing.push(field);
      }
    }

    if (missing.length > 0) {
      return sendError(
        res,
        `Validation error: Missing required fields: ${missing.join(", ")}`,
        HTTP_STATUS.BAD_REQUEST,
        { missingFields: missing },
      );
    }

    next();
  };
};
