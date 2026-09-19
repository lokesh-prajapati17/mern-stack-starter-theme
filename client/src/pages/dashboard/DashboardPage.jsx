import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Stack,
  useTheme,
  alpha,
  Divider,
} from "@mui/material";
import {
  Users,
  Shield,
  Activity,
  Sparkles,
  Layers,
  Code2,
  CheckCircle2,
} from "lucide-react";
import { selectCurrentUser } from "../../store/slices/authSlice";
import { CardBox } from "../../components/common/CardBox";
import { StatusBadge } from "../../components/common/StatusBadge";
import { Button } from "../../components/common/Button";
import { MotionSlideUp, MotionFadeIn } from "../../components/common/Motion";

/**
 * Dashboard Overview Page (Arrow function)
 * Responsive layout optimized across mobile (xs), tablet (sm/md), and desktop (lg/xl).
 */
export const DashboardPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const stats = [
    {
      id: "users",
      title: "Active Accounts",
      value: "2,845",
      change: "+14.2%",
      isPositive: true,
      icon: Users,
      color: "primary",
    },
    {
      id: "rbac",
      title: "Configured Roles",
      value: "3 Roles",
      change: "Admin • Mgr • User",
      isPositive: true,
      icon: Shield,
      color: "success",
    },
    {
      id: "apis",
      title: "API Endpoints",
      value: "18 Active",
      change: "100% Uptime",
      isPositive: true,
      icon: Activity,
      color: "info",
    },
    {
      id: "theme",
      title: "Theme Tokens",
      value: "Enterprise",
      change: "Zero Static Colors",
      icon: Sparkles,
      color: "warning",
    },
  ];

  return (
    <MotionFadeIn>
      <Box sx={{ width: "100%", mb: 4 }}>
        {/* Page Welcome Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
            mb: { xs: 2.5, sm: 3 },
          }}
        >
          <Box>
            <Typography
              variant="h3"
              fontWeight={800}
              gutterBottom
              sx={{
                fontSize: { xs: "1.5rem", sm: "1.875rem", md: "2.25rem" },
                lineHeight: 1.25,
              }}
            >
              Welcome back, {user?.name || "Developer"}! 👋
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your Custom Setup MERN enterprise boilerplate is active and ready
              for expansion.
            </Typography>
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              startIcon={<Layers size={18} />}
              onClick={() => navigate("/dashboard/showcase")}
              sx={{ flex: { sm: "initial" } }}
            >
              UI Atoms
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<Users size={18} />}
              onClick={() => navigate("/users")}
              sx={{ flex: { sm: "initial" } }}
            >
              User Directory
            </Button>
          </Stack>
        </Box>

        {/* 4 Stat Cards - 100% width on mobile (xs: 1fr), 2 cols on tablet (sm: 2fr), 4 cols on desktop */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: { xs: 2, sm: 2.5 },
            mb: { xs: 3, md: 4 },
            width: "100%",
          }}
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const colorPalette =
              theme.palette[stat.color] || theme.palette.primary;

            return (
              <MotionSlideUp delay={idx * 0.06} key={stat.id}>
                <CardBox
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover .stat-icon": {
                      transform: "scale(1.08) rotate(4deg)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box
                      className="stat-icon"
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: `${theme.shape.borderRadius * 0.75}px`,
                        bgcolor: alpha(colorPalette.main, 0.12),
                        color: colorPalette.main,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 0.25s ease",
                      }}
                    >
                      <Icon size={20} />
                    </Box>
                    <StatusBadge
                      status={stat.change}
                      color={stat.color}
                      size="small"
                    />
                  </Box>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                    sx={{ textTransform: "uppercase" }}
                  >
                    {stat.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight={800}
                    sx={{ mt: 0.5, fontSize: { xs: "1.4rem", sm: "1.75rem" } }}
                  >
                    {stat.value}
                  </Typography>
                </CardBox>
              </MotionSlideUp>
            );
          })}
        </Box>

        {/* Two Columns: Architecture Highlights & Active Session Profile */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "7fr 5fr",
            },
            gap: { xs: 2.5, md: 3 },
            width: "100%",
          }}
        >
          {/* Left: Architecture Highlights */}
          <CardBox
            title="Architecture Highlights"
            subtitle="Built according to modern enterprise design guidelines"
          >
            <Stack spacing={2.5}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: `${theme.shape.borderRadius * 0.75}px`,
                    bgcolor: alpha(theme.palette.success.main, 0.12),
                    color: "success.main",
                    flexShrink: 0,
                  }}
                >
                  <CheckCircle2 size={20} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={700}>
                    Strictly Token-Driven Theming
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Zero hardcoded hex colors, margins, or padding.
                    Automatically harmonizes in Dark Mode and Light Mode with
                    cyan brand accents.
                  </Typography>
                </Box>
              </Box>

              <Divider />

              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: `${theme.shape.borderRadius * 0.75}px`,
                    bgcolor: alpha(theme.palette.info.main, 0.12),
                    color: "info.main",
                    flexShrink: 0,
                  }}
                >
                  <CheckCircle2 size={20} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={700}>
                    Robust Role-Based Access Control (RBAC)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hierarchical roles (Admin &gt; Manager &gt; User) with
                    route-level and element-level RoleGuard wrappers.
                  </Typography>
                </Box>
              </Box>

              <Divider />

              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: `${theme.shape.borderRadius * 0.75}px`,
                    bgcolor: alpha(theme.palette.warning.main, 0.12),
                    color: "warning.main",
                    flexShrink: 0,
                  }}
                >
                  <CheckCircle2 size={20} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={700}>
                    Seamless JWT Refresh Queue & Mutex
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Automated 401 token refresh queue that transparently retries
                    failed requests without interrupting user interactions.
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </CardBox>

          {/* Right: Active Session Profile */}
          <CardBox
            title="Active Session Profile"
            subtitle="Current user authentication metadata"
          >
            <Stack spacing={2}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: `${theme.shape.borderRadius}px`,
                  bgcolor: "action.hover",
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  NAME
                </Typography>
                <Typography variant="subtitle1" fontWeight={700}>
                  {user?.name || "Local Administrator"}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, display: "block" }}
                >
                  EMAIL
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {user?.email || "admin@custommern.io"}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, display: "block" }}
                >
                  ASSIGNED ROLE
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <StatusBadge status={user?.role || "Admin"} color="primary" />
                </Box>
              </Box>

              <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<Code2 size={18} />}
                onClick={() => navigate("/dashboard/showcase")}
              >
                Inspect UI Component Atoms
              </Button>
            </Stack>
          </CardBox>
        </Box>
      </Box>
    </MotionFadeIn>
  );
};

export default DashboardPage;
