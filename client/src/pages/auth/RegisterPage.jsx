import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Typography, Stack, Alert, Link } from "@mui/material";
import { UserPlus, Lock, Mail, User } from "lucide-react";
import {
  registerUser,
  selectAuthLoading,
  selectAuthError,
} from "../../store/slices/authSlice";
import { TextInput } from "../../components/common/TextInput";
import { SelectInput } from "../../components/common/SelectInput";
import { Button } from "../../components/common/Button";
import { ROLES } from "../../constants/RbacConstants";

/**
 * RegisterPage Component (Arrow function)
 */
export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(ROLES.USER);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!name || !email || !password || !confirmPassword) {
      setFormError("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters long.");
      return;
    }

    const result = await dispatch(registerUser({ name, email, password, role }));
    if (!result.error) {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Create Account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Get started with your enterprise MERN dashboard
        </Typography>
      </Box>

      {(formError || error) && (
        <Alert severity="error" sx={{ mb: 2.5 }}>
          {formError || error}
        </Alert>
      )}

      <Stack spacing={2.5}>
        <TextInput
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          startIcon={<User size={18} />}
          required
        />

        <TextInput
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          startIcon={<Mail size={18} />}
          required
        />

        <SelectInput
          label="Account Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          options={[
            { value: ROLES.USER, label: "User (Standard Access)" },
            { value: ROLES.MANAGER, label: "Manager (Team Management)" },
            { value: ROLES.ADMIN, label: "Admin (Full System Access)" },
          ]}
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

        <TextInput
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
    </Box>
  );
};

export default RegisterPage;
