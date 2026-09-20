import * as Yup from "yup";
import {
  emailValidator,
  passwordValidator,
  requiredString,
  booleanRequired,
} from "./commonSchemas";

/**
 * Authentication Validation Schemas
 */

export const loginSchema = Yup.object().shape({
  email: emailValidator,
  password: passwordValidator,
  rememberMe: Yup.boolean().optional(),
});

export const registerSchema = Yup.object().shape({
  name: requiredString("Full Name").min(2, "Name must be at least 2 characters"),
  email: emailValidator,
  password: passwordValidator,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  role: Yup.string().optional(),
  agreeTerms: booleanRequired("You must agree to the Terms of Service to continue"),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: emailValidator,
});

export const resetPasswordSchema = Yup.object().shape({
  password: passwordValidator,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});
