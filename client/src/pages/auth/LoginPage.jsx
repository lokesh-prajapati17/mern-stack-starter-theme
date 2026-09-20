import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Typography, Stack, Alert, Link } from "@mui/material";
import { LogIn, Lock, Mail } from "lucide-react";
import { Formik, Form } from "formik";
import {
  loginUser,
  selectAuthLoading,
  selectAuthError,
} from "../../store/slices/authSlice";
import { Button } from "../../components/common/Button";
import { FormikTextInput } from "../../components/form/fields/FormikTextInput";
import { loginSchema } from "../../components/form/schemas/authSchemas";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (values, { setSubmitting }) => {
    const result = await dispatch(
      loginUser({ email: values.email, password: values.password }),
    );
    setSubmitting(false);
    if (!result.error) {
      navigate(from, { replace: true });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sign in to access your Custom Setup MERN workspace
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2.5 }}>
          {error}
        </Alert>
      )}

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form noValidate>
            <Stack spacing={2.5}>
              <FormikTextInput
                name="email"
                label="Email Address"
                type="email"
                placeholder="admin@custommern.io"
                startIcon={<Mail size={18} />}
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

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                loading={loading || isSubmitting}
                startIcon={<LogIn size={18} />}
              >
                Sign In
              </Button>

              <Box sx={{ textAlign: "center", mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{" "}
                  <Link
                    component={RouterLink}
                    to="/register"
                    color="primary.main"
                    fontWeight={600}
                  >
                    Create one now
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

export default LoginPage;
