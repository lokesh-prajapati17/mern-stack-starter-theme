import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Typography, Stack, Alert, Link } from "@mui/material";
import { UserPlus, Lock, Mail, User } from "lucide-react";
import { Formik, Form } from "formik";
import {
  registerUser,
  selectAuthLoading,
  selectAuthError,
} from "../../store/slices/authSlice";
import { Button } from "../../components/common/Button";
import { FormikTextInput } from "../../components/form/fields/FormikTextInput";
import { FormikSelectInput } from "../../components/form/fields/FormikSelectInput";
import { FormikCheckboxInput } from "../../components/form/fields/FormikCheckboxInput";
import { registerSchema } from "../../components/form/schemas/authSchemas";
import { ROLES } from "../../constants/RbacConstants";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const handleSubmit = async (values, { setSubmitting }) => {
    const result = await dispatch(
      registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      }),
    );
    setSubmitting(false);
    if (!result.error) {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Create Account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Get started with your enterprise MERN dashboard
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2.5 }}>
          {error}
        </Alert>
      )}

      <Formik
        initialValues={{
          name: "",
          email: "",
          role: ROLES.USER,
          password: "",
          confirmPassword: "",
          agreeTerms: false,
        }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form noValidate>
            <Stack spacing={2.5}>
              <FormikTextInput
                name="name"
                label="Full Name"
                type="text"
                placeholder="John Doe"
                startIcon={<User size={18} />}
                required
              />

              <FormikTextInput
                name="email"
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                startIcon={<Mail size={18} />}
                required
              />

              <FormikSelectInput
                name="role"
                label="Account Role"
                options={[
                  { value: ROLES.USER, label: "User (Standard Access)" },
                  { value: ROLES.MANAGER, label: "Manager (Team Management)" },
                  { value: ROLES.ADMIN, label: "Admin (Full System Access)" },
                ]}
                required
              />

              <FormikTextInput
                name="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                startIcon={<Lock size={18} />}
                required
              />

              <FormikTextInput
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                startIcon={<Lock size={18} />}
                required
              />

              <FormikCheckboxInput
                name="agreeTerms"
                label="I agree to the Terms of Service and Privacy Policy"
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                loading={loading || isSubmitting}
                startIcon={<UserPlus size={18} />}
              >
                Sign Up
              </Button>

              <Box sx={{ textAlign: "center", mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{" "}
                  <Link
                    component={RouterLink}
                    to="/login"
                    color="primary.main"
                    fontWeight={600}
                  >
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterPage;
