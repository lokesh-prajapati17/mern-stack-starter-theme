import * as Yup from "yup";
import {
  emailValidator,
  phoneValidator,
  requiredString,
  optionalString,
} from "./commonSchemas";

/**
 * User & Profile Validation Schemas
 */

export const userProfileSchema = Yup.object().shape({
  name: requiredString("Full Name").min(2, "Name must be at least 2 characters"),
  email: emailValidator,
  phone: phoneValidator,
  role: Yup.string()
    .oneOf(["Admin", "Manager", "User"], "Invalid role selected")
    .required("Role is required"),
  bio: optionalString.max(300, "Bio cannot exceed 300 characters"),
  notifications: Yup.boolean().optional(),
});

/**
 * Multi-Step Wizard Schemas
 */
export const wizardStep1Schema = Yup.object().shape({
  companyName: requiredString("Company Name"),
  workEmail: emailValidator,
  teamSize: Yup.string().required("Please select your team size"),
});

export const wizardStep2Schema = Yup.object().shape({
  roleTitle: requiredString("Your Job Title"),
  department: Yup.string().required("Please select your department"),
  primaryGoal: Yup.string().required("Please select your primary goal"),
});

export const wizardStep3Schema = Yup.object().shape({
  plan: Yup.string().required("Please select a plan"),
  billingCycle: Yup.string().required("Please select a billing cycle"),
  agreePolicies: Yup.boolean().oneOf([true], "You must agree to proceed"),
});
