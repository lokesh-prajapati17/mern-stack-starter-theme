import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Typography, Stack, Alert, Link } from "@mui/material";
import { LogIn, Lock, Mail } from "lucide-react";
import {
  loginUser,
  selectAuthLoading,
  selectAuthError,
  setCredentials,
} from "../../store/slices/authSlice";
import { TextInput } from "../../components/common/TextInput";
import { Button } from "../../components/common/Button";
import { ROLES } from "../../constants/RbacConstants";

/**
 * LoginPage Component (Arrow function)
 */
export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!email || !password) {
      setFormError("Please enter both email and password.");
      return;
    }

    const result = await dispatch(loginUser({ email, password }));
    if (!result.error) {
      navigate(from, { replace: true });
    }
  };

  // Quick Demo Login helper for local development testing
  const handleQuickDemoLogin = (role) => {
    dispatch(
      setCredentials({
        user: {
          id: "demo_user_123",
          name: `${role} User`,
          email: `${role.toLowerCase()}@custommern.io`,
          role,
          status: "Active",
        },
        token: "mock_jwt_access_token",
        refreshToken: "mock_jwt_refresh_token",
      }),
    );
    navigate(from, { replace: true });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sign in to access your Custom Setup MERN workspace
        </Typography>
      </Box>

      {(formError || error) && (
        <Alert severity="error" sx={{ mb: 2.5 }}>
          {formError || error}
        </Alert>
      )}

      <Stack spacing={2.5}>
        <TextInput
          label="Email Address"
          type="email"
          placeholder="admin@custommern.io"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          startIcon={<Mail size={18} />}
          required
        />

        <TextInput
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          startIcon={<Lock size={18} />}
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          loading={loading}
          startIcon={<LogIn size={18} />}
        >
          Sign In
        </Button>

        {/* Quick Demo Logins for instant evaluation */}
        <Box
          sx={{
            p: 2,
            borderRadius: (t) => `${t.shape.borderRadius}px`,
            border: (t) => `1px dashed ${t.palette.divider}`,
            bgcolor: "action.hover",
            textAlign: "center",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={600}
            display="block"
            mb={1}
          >
            Quick Role Switch Demo (Offline Preview):
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => handleQuickDemoLogin(ROLES.ADMIN)}
            >
              Admin
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={() => handleQuickDemoLogin(ROLES.MANAGER)}
            >
              Manager
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="info"
              onClick={() => handleQuickDemoLogin(ROLES.USER)}
            >
              User
            </Button>
          </Box>
        </Box>

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
    </Box>
  );
};

export default LoginPage;
