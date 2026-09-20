import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
  useTheme,
  alpha,
} from "@mui/material";
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { useBreakpoint } from "../../contexts/BreakpointContext";
import { LAYOUT_CONSTANTS } from "../../constants/LayoutConstants";
import { selectCurrentUser } from "../../store/slices/authSlice";
import { getAuthorizedNavGroups } from "./navigation";
import { IconButton } from "../../components/common/IconButton";

export const Sidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLgUp, drawer } = useBreakpoint();
  const user = useSelector(selectCurrentUser);

  const isMini = isLgUp && drawer.isMini;
  const isDarkMode = theme.palette.mode === "dark";
  const currentPath = location.pathname;

  const navGroups = useMemo(
    () => getAuthorizedNavGroups(user?.role || "Admin"),
    [user?.role],
  );

  const handleNavigate = (url) => {
    navigate(url);
    if (!isLgUp) {
      drawer.closeMobile();
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Sidebar background dynamically derived from theme tokens & palette
  const sidebarBg = isDarkMode
    ? `linear-gradient(180deg, ${theme.palette.custom?.surfaces?.selected || theme.palette.primary[950]} 0%, ${theme.palette.background.sidebar || theme.palette.background.default} 100%)`
    : `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary[900] || theme.palette.primary.dark} 100%)`;

  // Active text color derived from theme primary palette for high-contrast on white card
  const activeTextColor = isDarkMode
    ? theme.palette.primary[900] || theme.palette.primary.dark
    : theme.palette.primary.main;

  const borderDividerColor = alpha(theme.palette.common.white, 0.12);
  const userName = user?.name || "Jane Doe";
  const userRole = user?.role || "Super Admin";

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: theme.palette.common.white,
        overflowX: "hidden",
      }}
    >
      {/* ── Top Brand Header (Aligned with desktop Header 64px height and borderBottom) ── */}
      <Box
        sx={{
          height: {
            xs: LAYOUT_CONSTANTS.HEADER_HEIGHT_MOBILE,
            md: LAYOUT_CONSTANTS.HEADER_HEIGHT_DESKTOP,
          },
          minHeight: {
            xs: LAYOUT_CONSTANTS.HEADER_HEIGHT_MOBILE,
            md: LAYOUT_CONSTANTS.HEADER_HEIGHT_DESKTOP,
          },
          px: isMini ? 0 : 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: isMini ? "center" : "space-between",
          borderBottom: `1px solid ${borderDividerColor}`,
          flexShrink: 0,
          boxSizing: "border-box",
          "@keyframes logoShimmer": {
            "0%, 100%": {
              boxShadow:
                "0 2px 8px rgba(0, 0, 0, 0.15), 0 0 0 0 rgba(255, 255, 255, 0.15)",
            },
            "50%": {
              boxShadow:
                "0 2px 12px rgba(0, 0, 0, 0.2), 0 0 10px 1px rgba(255, 255, 255, 0.35)",
            },
          },
        }}
      >
        <Box
          onClick={() => handleNavigate("/dashboard")}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: isMini ? "center" : "flex-start",
            gap: 1.5,
            cursor: "pointer",
            userSelect: "none",
            minWidth: 0,
            width: isMini ? "100%" : "auto",
            "&:hover .brand-logo-icon": {
              transform: isMini
                ? "scale(1.1) rotate(-6deg)"
                : "scale(1.08) rotate(-6deg)",
              bgcolor: alpha(theme.palette.common.white, 0.28),
              boxShadow:
                "0 4px 16px rgba(0, 0, 0, 0.25), 0 0 14px rgba(255, 255, 255, 0.4)",
            },
            "&:hover .brand-title": {
              letterSpacing: "0.2px",
              textShadow: "0 0 12px rgba(255, 255, 255, 0.35)",
            },
            "&:hover .brand-subtitle": {
              color: theme.palette.common.white,
              transform: "translateX(2px)",
            },
            "&:active .brand-logo-icon": {
              transform: "scale(0.95)",
            },
          }}
        >
          {/* Logo Badge Icon (Shared across expanded & mini modes) */}
          <Box
            className="brand-logo-icon"
            sx={{
              width: 36,
              height: 36,
              borderRadius: "9px",
              bgcolor: alpha(theme.palette.common.white, 0.2),
              color: theme.palette.common.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "1.05rem",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
              flexShrink: 0,
              animation: "logoShimmer 4s ease-in-out infinite",
              transition:
                "transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.25s ease, box-shadow 0.25s ease",
            }}
          >
            M
          </Box>

          {/* Brand Titles (Expanded mode only) */}
          {!isMini && (
            <Box sx={{ minWidth: 0 }}>
              <Typography
                className="brand-title"
                variant="subtitle1"
                noWrap
                sx={{
                  fontWeight: 800,
                  color: theme.palette.common.white,
                  fontSize: "0.95rem",
                  letterSpacing: "-0.2px",
                  lineHeight: 1.2,
                  transition:
                    "letter-spacing 0.25s ease, text-shadow 0.25s ease, color 0.2s ease",
                }}
              >
                Custom MERN
              </Typography>
              <Typography
                className="brand-subtitle"
                variant="caption"
                noWrap
                sx={{
                  display: "block",
                  color: alpha(theme.palette.common.white, 0.72),
                  fontWeight: 500,
                  fontSize: "0.6875rem",
                  lineHeight: 1.1,
                  mt: 0.2,
                  transition:
                    "transform 0.25s ease, color 0.25s ease, opacity 0.2s ease",
                }}
              >
                Fast. Modular. Reliable.
              </Typography>
            </Box>
          )}
        </Box>

        {/* Mobile close button */}
        {!isMini && !isLgUp && (
          <IconButton
            size="small"
            onClick={drawer.closeMobile}
            title="Close navigation"
            sx={{
              color: alpha(theme.palette.common.white, 0.8),
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: alpha(theme.palette.common.white, 0.15),
                color: theme.palette.common.white,
                transform: "rotate(90deg)",
              },
            }}
          >
            <X size={18} />
          </IconButton>
        )}
      </Box>

      {/* ── Scrollable Navigation Items Section ── */}
      <Box
        sx={{ flexGrow: 1, overflowY: "auto", overflowX: "hidden", py: 1.5 }}
      >
        {navGroups.map((group) => (
          <Box key={group.id} sx={{ mb: 1 }}>
            {/* Section Header */}
            {group.header && !isMini && (
              <Typography
                variant="caption"
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: 1,
                  display: "block",
                  color: alpha(theme.palette.common.white, 0.55),
                  fontWeight: 700,
                  fontSize: "0.6875rem",
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  transition: "opacity 0.2s ease",
                }}
              >
                {group.header}
              </Typography>
            )}

            <List sx={{ px: isMini ? 1.5 : 2, py: 0 }}>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isSelected =
                  currentPath === item.url ||
                  (item.url !== "/dashboard" &&
                    currentPath.startsWith(item.url));

                const buttonContent = (
                  <ListItemButton
                    selected={isSelected}
                    onClick={() => handleNavigate(item.url)}
                    sx={{
                      minHeight: 44,
                      mb: 0.75,
                      borderRadius: "10px",
                      justifyContent: isMini ? "center" : "initial",
                      px: isMini ? 1.2 : 2,
                      transition: "all 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      cursor: "pointer",

                      // Tactile click feedback
                      "&:active": {
                        transform: "scale(0.98)",
                      },

                      // Active Selected State (Pure White Pop-out Card)
                      ...(isSelected && {
                        bgcolor: `${theme.palette.common.white} !important`,
                        color: `${activeTextColor} !important`,
                        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
                        transform: isMini ? "scale(1.04)" : "translateX(2px)",
                        "& .MuiListItemIcon-root": {
                          color: `${activeTextColor} !important`,
                          transform: "scale(1.06)",
                        },
                        "&:hover": {
                          bgcolor: `${theme.palette.common.white} !important`,
                          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                          transform: isMini ? "scale(1.06)" : "translateX(4px)",
                        },
                      }),

                      // Inactive State
                      ...(!isSelected && {
                        color: alpha(theme.palette.common.white, 0.85),
                        "& .MuiListItemIcon-root": {
                          color: alpha(theme.palette.common.white, 0.85),
                          transition:
                            "transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s ease",
                        },
                        "&:hover": {
                          bgcolor: alpha(theme.palette.common.white, 0.12),
                          color: theme.palette.common.white,
                          transform: isMini ? "scale(1.05)" : "translateX(4px)",
                          "& .MuiListItemIcon-root": {
                            color: theme.palette.common.white,
                            transform: "scale(1.14)",
                          },
                        },
                      }),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: isMini ? 0 : 1.75,
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={19} />
                    </ListItemIcon>

                    {!isMini && (
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "0.875rem",
                              fontWeight: isSelected ? 700 : 500,
                              color: "inherit",
                              transition: "font-weight 0.2s ease",
                            }}
                          >
                            {item.title}
                          </Typography>
                        }
                      />
                    )}
                  </ListItemButton>
                );

                return (
                  <ListItem
                    key={item.id}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    {isMini ? (
                      <Tooltip title={item.title} placement="right" arrow>
                        {buttonContent}
                      </Tooltip>
                    ) : (
                      buttonContent
                    )}
                  </ListItem>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>

      {/* ── Docked Bottom User Card (Unified for expanded & mini modes) ── */}
      <Box
        sx={{
          borderTop: `1px solid ${borderDividerColor}`,
          p: isMini ? 1 : 1.5,
        }}
      >
        <Box
          sx={{
            p: isMini ? 0.75 : 1.25,
            borderRadius: "10px",
            bgcolor: isMini
              ? "transparent"
              : alpha(theme.palette.common.black, 0.12),
            display: "flex",
            flexDirection: isMini ? "column" : "row",
            alignItems: "center",
            justifyContent: isMini ? "center" : "space-between",
            gap: isMini ? 1.5 : 0,
            cursor: "pointer",
            transition: "all 0.24s cubic-bezier(0.4, 0, 0.2, 1)",
            ...(!isMini && {
              "&:hover": {
                bgcolor: alpha(theme.palette.common.white, 0.14),
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.16)",
                "& .user-avatar-initials": {
                  transform: "scale(1.06)",
                  bgcolor: alpha(theme.palette.common.white, 0.28),
                },
              },
              "&:active": {
                transform: "translateY(0) scale(0.99)",
              },
            }),
          }}
        >
          {/* User Profile Trigger */}
          <Tooltip
            title={isMini ? `${userName} (${userRole})` : ""}
            placement="right"
            arrow
            disableHoverListener={!isMini}
          >
            <Box
              onClick={() => handleNavigate("/profile")}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                minWidth: 0,
              }}
            >
              <Box
                className="user-avatar-initials"
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "8px",
                  bgcolor: alpha(theme.palette.common.white, 0.22),
                  color: theme.palette.common.white,
                  fontWeight: 800,
                  fontSize: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.24s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  ...(isMini && {
                    "&:hover": {
                      bgcolor: alpha(theme.palette.common.white, 0.32),
                      transform: "scale(1.1)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    },
                    "&:active": {
                      transform: "scale(0.95)",
                    },
                  }),
                }}
              >
                {getInitials(user?.name)}
              </Box>

              {!isMini && (
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="subtitle2"
                    noWrap
                    sx={{
                      color: theme.palette.common.white,
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {userName}
                  </Typography>
                  <Typography
                    variant="caption"
                    noWrap
                    sx={{
                      color: alpha(theme.palette.common.white, 0.65),
                      fontSize: "0.75rem",
                      display: "block",
                      mt: 0.2,
                    }}
                  >
                    {userRole}
                  </Typography>
                </Box>
              )}
            </Box>
          </Tooltip>

          {/* Desktop Mini/Expand Toggle Button */}
          {isLgUp && (
            <Box
              component="button"
              onClick={(e) => {
                e.stopPropagation();
                drawer.toggleMini();
              }}
              title={isMini ? "Expand sidebar" : "Collapse sidebar"}
              sx={{
                border: "none",
                bgcolor: "transparent",
                color: alpha(theme.palette.common.white, 0.7),
                cursor: "pointer",
                p: 0.6,
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                "&:hover": {
                  color: theme.palette.common.white,
                  bgcolor: alpha(theme.palette.common.white, 0.18),
                  transform: isMini ? "scale(1.18)" : "scale(1.15)",
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
            >
              {isMini ? (
                <PanelLeftOpen size={16} />
              ) : (
                <PanelLeftClose size={16} />
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop Permanent Full-Height Sidebar */}
      <Box
        component="nav"
        aria-label="Desktop application navigation"
        sx={{
          display: { xs: "none", lg: "block" },
          width: isMini
            ? LAYOUT_CONSTANTS.DRAWER_WIDTH_MINI
            : LAYOUT_CONSTANTS.DRAWER_WIDTH_EXPANDED,
          flexShrink: 0,
          transition: "width 225ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", lg: "block" },
            zIndex: (theme) => theme.zIndex.appBar + 1,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: isMini
                ? LAYOUT_CONSTANTS.DRAWER_WIDTH_MINI
                : LAYOUT_CONSTANTS.DRAWER_WIDTH_EXPANDED,
              borderRadius: 0,
              border: "none",
              borderRight: (theme) =>
                theme.palette.mode === "dark"
                  ? `1px solid ${alpha(theme.palette.primary.main, 0.15)}`
                  : "none",
              top: 0,
              height: "100vh",
              transition: "width 225ms cubic-bezier(0.4, 0, 0.2, 1)",
              overflowX: "hidden",
              background: sidebarBg,
              boxShadow: "4px 0 24px rgba(0, 0, 0, 0.08)",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Mobile Temporary Drawer */}
      <Drawer
        variant="temporary"
        open={drawer.isMobileOpen}
        onClose={drawer.closeMobile}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          zIndex: (theme) => theme.zIndex.drawer,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: LAYOUT_CONSTANTS.DRAWER_WIDTH_MOBILE,
            borderRadius: 0,
            border: "none",
            background: sidebarBg,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
