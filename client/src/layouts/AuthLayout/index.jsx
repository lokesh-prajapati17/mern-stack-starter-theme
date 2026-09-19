import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Stack,
  Typography,
  useTheme,
  Card,
} from "@mui/material";
import { useThemeMode } from "../../themes/useThemeMode";
import { IconButton } from "../../components/common/IconButton";
import { Sun, Moon } from "lucide-react";

/**
 * AuthLayout Component (Arrow function)
 * Clean, centered card authentication layout strictly consuming theme tokens.
 */
export const AuthLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isDark, toggle: toggleTheme } = useThemeMode();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        background:
          theme.palette.gradients?.surface || theme.palette.background.default,
      }}
    >
      {/* Top Bar with brand icon & theme switch */}
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          onClick={() => navigate("/login")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: `${theme.shape.borderRadius}px`,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "1.2rem",
              boxShadow: (t) => t.customShadows?.button || "none",
            }}
          >
            M
          </Box>
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{
              background: theme.palette.gradients?.heading || "inherit",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Custom MERN
          </Typography>
        </Box>

        <IconButton
          title={isDark ? "Switch to Light" : "Switch to Dark"}
          onClick={toggleTheme}
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: "action.hover",
            color: isDark ? "warning.main" : "text.primary",
          }}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </IconButton>
      </Box>

      {/* Centered Auth Card Container */}
      <Container
        maxWidth="sm"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Card
          sx={{
            width: "100%",
            p: { xs: 3, sm: 4.5 },
            borderRadius: `${theme.shape.borderRadius * 1.5}px`,
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: "background.paper",
            boxShadow: theme.customShadows?.dialog || theme.shadows[10],
          }}
        >
          <Outlet />
        </Card>
      </Container>

      {/* Footer */}
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="caption" color="text.secondary">
          Custom Setup MERN • Enterprise Design System
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthLayout;
