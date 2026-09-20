const { HTTP_STATUS } = require("../constants/httpStatus");
const { sendError } = require("../utils/apiResponse");

const validateBody = (requiredFields = []) => {
  return (req, res, next) => {
    const missing = [];
    for (const field of requiredFields) {
      if (
        req.body[field] === undefined ||
        req.body[field] === null ||
        (typeof req.body[field] === "string" && req.body[field].trim() === "")
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

const validateSchema = (schemaRules = {}) => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (req, res, next) => {
    const errors = {};

    for (const [field, rules] of Object.entries(schemaRules)) {
      const val = req.body[field];

      if (rules.required && (val === undefined || val === null || val === "")) {
        errors[field] = rules.message || `${field} is required`;
        continue;
      }

      if (val !== undefined && val !== null && val !== "") {
        if (rules.type === "email" && !EMAIL_REGEX.test(String(val))) {
          errors[field] = "Please provide a valid email address";
        } else if (rules.min && String(val).length < rules.min) {
          errors[field] = `${field} must be at least ${rules.min} characters`;
        } else if (rules.max && String(val).length > rules.max) {
          errors[field] = `${field} cannot exceed ${rules.max} characters`;
        } else if (rules.enum && !rules.enum.includes(val)) {
          errors[field] = `${field} must be one of: ${rules.enum.join(", ")}`;
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      return sendError(
        res,
        "Validation failed. Please verify your input.",
        HTTP_STATUS.BAD_REQUEST,
        { fieldErrors: errors },
      );
    }

    next();
  };
};

const sanitizeBody = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    for (const key of Object.keys(req.body)) {
      if (key === "__proto__" || key === "constructor" || key === "prototype") {
        delete req.body[key];
      } else if (typeof req.body[key] === "string") {
        req.body[key] = req.body[key].trim();
      }
    }
  }
  next();
};

module.exports = {
  validateBody,
  validateSchema,
  sanitizeBody,
};
