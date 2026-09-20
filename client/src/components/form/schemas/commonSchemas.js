import * as Yup from "yup";

/**
 * Reusable Common Yup Validation Schemas
 * Standardized across the enterprise theme.
 */

export const emailValidator = Yup.string()
  .trim()
  .email("Please enter a valid email address")
  .required("Email address is required");

export const optionalEmailValidator = Yup.string()
  .trim()
  .email("Please enter a valid email address")
  .nullable();

export const passwordValidator = Yup.string()
  .min(6, "Password must be at least 6 characters")
  .max(100, "Password cannot exceed 100 characters")
  .required("Password is required");

export const strongPasswordValidator = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .required("Password is required");

export const requiredString = (fieldName = "This field") =>
  Yup.string()
    .trim()
    .required(`${fieldName} is required`);

export const optionalString = Yup.string().trim().nullable();

export const phoneValidator = Yup.string()
  .matches(
    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
    "Please enter a valid phone number",
  )
  .nullable();

export const urlValidator = Yup.string()
  .url("Please enter a valid URL (e.g., https://example.com)")
  .nullable();

export const booleanRequired = (message = "You must agree to continue") =>
  Yup.boolean().oneOf([true], message);
