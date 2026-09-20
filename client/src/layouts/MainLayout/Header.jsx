import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  Stack,
  alpha,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Sun,
  Moon,
  LogOut,
  User as UserIcon,
  Shield,
  Settings,
} from "lucide-react";
import { useBreakpoint } from "../../contexts/BreakpointContext";
import { useThemeMode } from "../../themes/useThemeMode";
import { selectCurrentUser, logout } from "../../store/slices/authSlice";
import { StatusBadge } from "../../components/common/StatusBadge";
import { IconButton } from "../../components/common/IconButton";
import { LAYOUT_CONSTANTS } from "../../constants/LayoutConstants";

export const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLgUp, drawer } = useBreakpoint();
  const { isDark, toggle: toggleTheme } = useThemeMode();
  const user = useSelector(selectCurrentUser);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleOpenProfile = (event) => setAnchorEl(event.currentTarget);
  const handleCloseProfile = () => setAnchorEl(null);

  const handleLogout = () => {
    handleCloseProfile();
    dispatch(logout());
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{
        height: {
          xs: LAYOUT_CONSTANTS.HEADER_HEIGHT_MOBILE,
          md: LAYOUT_CONSTANTS.HEADER_HEIGHT_DESKTOP,
        },
        maxHeight: {
          xs: LAYOUT_CONSTANTS.HEADER_HEIGHT_MOBILE,
          md: LAYOUT_CONSTANTS.HEADER_HEIGHT_DESKTOP,
        },
        boxSizing: "border-box",
        bgcolor: "background.header",
        backdropFilter: "blur(12px)",
        borderRadius: 0,
        border: "none",
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: "all 0.2s ease",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: "0px !important",
          height: "100%",
          px: { xs: 1.5, sm: 2.5 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        {/* Left Side: Brand Logo & Drawer Toggle */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {/* Mobile hamburger or desktop mini toggle */}
          <IconButton
            title={
              isLgUp
                ? drawer.isMini
                  ? "Expand sidebar"
                  : "Collapse sidebar"
                : "Open navigation menu"
            }
            color="inherit"
            aria-label="Toggle navigation drawer"
            onClick={isLgUp ? drawer.toggleMini : drawer.openMobile}
            sx={{
              width: 36,
              height: 36,
              color: "text.secondary",
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: "action.hover",
            }}
          >
            <MenuIcon size={18} />
          </IconButton>

          <Box
            onClick={() => navigate("/dashboard")}
            sx={{
              display: { xs: "flex", lg: "none" },
              alignItems: "center",
              gap: 1.25,
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: `${theme.shape.borderRadius * 0.7}px`,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "1rem",
                boxShadow: (t) => t.customShadows?.button || "none",
              }}
            >
              M
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={800}
                sx={{
                  background: theme.palette.gradients?.heading || "inherit",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.2,
                }}
              >
                Custom MERN
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontSize: "0.6875rem",
                  lineHeight: 1.2,
                }}
              >
                Enterprise Starter Boilerplate
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Right Side: Theme Switcher & User Profile Menu */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {/* Theme Mode Toggle (Light / Dark) */}
          <IconButton
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            onClick={toggleTheme}
            sx={{
              width: 36,
              height: 36,
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: "action.hover",
              color: isDark ? "warning.main" : "text.primary",
              transition: "transform 0.25s ease, background-color 0.2s ease",
              "&:hover": {
                transform: "rotate(20deg)",
                bgcolor: "action.selected",
              },
            }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </IconButton>

          {/* User Profile Menu Trigger */}
          <Tooltip title="User profile & settings" arrow>
            <Box
              onClick={handleOpenProfile}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                height: 36,
                p: 0.5,
                pr: { xs: 0.5, sm: 1.5 },
                borderRadius: `${theme.shape.borderRadius * 0.8}px`,
                cursor: "pointer",
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: "action.hover",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "action.selected",
                  borderColor: "primary.main",
                },
              }}
            >
              <Avatar
                src={user?.avatar}
                sx={{
                  width: 26,
                  height: 26,
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                  color: "primary.main",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}
              >
                {getInitials(user?.name)}
              </Avatar>

              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "left",
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  sx={{ fontSize: "0.8125rem", lineHeight: 1.1 }}
                >
                  {user?.name || "Developer"}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: "0.6875rem", lineHeight: 1.1 }}
                >
                  {user?.role || "Guest"}
                </Typography>
              </Box>
            </Box>
          </Tooltip>
        </Box>

        {/* Profile Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseProfile}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          slotProps={{
            paper: {
              sx: {
                minWidth: 220,
                mt: 1.5,
              },
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" fontWeight={700}>
              {user?.name || "Account"}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mb: 1 }}
            >
              {user?.email || "admin@custommern.io"}
            </Typography>
            <StatusBadge
              status={user?.role || "Admin"}
              color="primary"
              size="small"
            />
          </Box>

          <Divider />

          <MenuItem
            onClick={() => {
              handleCloseProfile();
              navigate("/profile");
            }}
          >
            <ListItemIcon>
              <UserIcon size={16} />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleCloseProfile();
              navigate("/settings");
            }}
          >
            <ListItemIcon>
              <Settings size={16} />
            </ListItemIcon>
            <ListItemText primary="Account Settings" />
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleCloseProfile();
              navigate("/dashboard/rbac");
            }}
          >
            <ListItemIcon>
              <Shield size={16} />
            </ListItemIcon>
            <ListItemText primary="Permissions" />
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
            <ListItemIcon sx={{ color: "error.main" }}>
              <LogOut size={16} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
