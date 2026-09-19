import React from "react";
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
  Stack,
  alpha,
} from "@mui/material";
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { useBreakpoint } from "../../contexts/BreakpointContext";
import { LAYOUT_CONSTANTS } from "../../constants/LayoutConstants";
import { selectCurrentUser } from "../../store/slices/authSlice";
import { getAuthorizedNavItems } from "./navigation";
import { IconButton } from "../../components/common/IconButton";

/**
 * Sidebar Navigation Component (Arrow function)
 */
export const Sidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLgUp, drawer } = useBreakpoint();
  const user = useSelector(selectCurrentUser);

  const navItems = getAuthorizedNavItems(user?.role || "Admin");
  const currentPath = location.pathname;

  const handleNavigate = (url) => {
    navigate(url);
    if (!isLgUp) {
      drawer.closeMobile();
    }
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        py: 1.5,
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {/* Navigation Items List */}
      <Box>
        {/* Mobile Header Branding */}
        {!isLgUp && (
          <Box
            sx={{
              px: 2,
              py: 1.5,
              mb: 1.5,
              borderBottom: `1px solid ${theme.palette.divider}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: `${theme.shape.borderRadius}px`,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                }}
              >
                M
              </Box>
              <Box>
                <Typography variant="subtitle2" fontWeight={800} noWrap>
                  Custom MERN
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  Starter Template
                </Typography>
              </Box>
            </Box>
            <IconButton
              size="small"
              onClick={drawer.closeMobile}
              title="Close navigation"
              sx={{
                width: 32,
                height: 32,
                color: "text.secondary",
                "&:hover": {
                  color: "text.primary",
                  bgcolor: "action.hover",
                },
              }}
            >
              <X size={18} />
            </IconButton>
          </Box>
        )}

        {/* Section Label */}
        {(!isLgUp || !drawer.isMini) && (
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{
              px: 2.5,
              py: 1,
              display: "block",
              fontWeight: 700,
            }}
          >
            Main Menu
          </Typography>
        )}

        <List sx={{ px: 1.5, py: 0 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected =
              currentPath === item.url ||
              (item.url !== "/dashboard" && currentPath.startsWith(item.url));

            const buttonContent = (
              <ListItemButton
                selected={isSelected}
                onClick={() => handleNavigate(item.url)}
                sx={{
                  minHeight: 42,
                  mb: 0.5,
                  borderRadius: `${theme.shape.borderRadius}px`,
                  justifyContent:
                    isLgUp && drawer.isMini ? "center" : "initial",
                  px: isLgUp && drawer.isMini ? 1.2 : 2,
                  transition: "background-color 0.15s ease, color 0.15s ease",
                  "&.Mui-selected": {
                    bgcolor: "action.selected",
                    color: "primary.main",
                    fontWeight: 600,
                    "& .MuiListItemIcon-root": {
                      color: "primary.main",
                    },
                    "&:hover": {
                      bgcolor: "action.selected",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isLgUp && drawer.isMini ? 0 : 1.8,
                    justifyContent: "center",
                    color: isSelected ? "primary.main" : "text.secondary",
                  }}
                >
                  <Icon size={19} />
                </ListItemIcon>
                {(!isLgUp || !drawer.isMini) && (
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: isSelected ? 600 : 500,
                          color: "inherit",
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
              <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
                {isLgUp && drawer.isMini ? (
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

      {/* Desktop Footer: Sidebar Mini Toggle */}
      {isLgUp && (
        <Box
          sx={{
            px: drawer.isMini ? 1 : 2,
            py: 1.5,
            mt: "auto",
            borderTop: `1px solid ${theme.palette.divider}`,
            display: "flex",
            alignItems: "center",
            justifyContent: drawer.isMini ? "center" : "space-between",
          }}
        >
          {!drawer.isMini && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 600, userSelect: "none" }}
            >
              Collapse Navigation
            </Typography>
          )}
          <IconButton
            size="small"
            onClick={drawer.toggleMini}
            title={drawer.isMini ? "Expand sidebar" : "Collapse sidebar"}
            placement={drawer.isMini ? "right" : "top"}
            sx={{
              width: 32,
              height: 32,
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: "action.hover",
            }}
          >
            {drawer.isMini ? (
              <PanelLeftOpen size={16} />
            ) : (
              <PanelLeftClose size={16} />
            )}
          </IconButton>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {/* Desktop Permanent Drawer */}
      <Box
        component="nav"
        aria-label="Desktop application navigation"
        sx={{
          display: { xs: "none", lg: "block" },
          width: drawer.isMini
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
            zIndex: (theme) => theme.zIndex.appBar - 1,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawer.isMini
                ? LAYOUT_CONSTANTS.DRAWER_WIDTH_MINI
                : LAYOUT_CONSTANTS.DRAWER_WIDTH_EXPANDED,
              borderRadius: 0,
              border: "none",
              borderRight: `1px solid ${theme.palette.divider}`,
              top: {
                xs: LAYOUT_CONSTANTS.HEADER_HEIGHT_MOBILE,
                md: LAYOUT_CONSTANTS.HEADER_HEIGHT_DESKTOP,
              },
              height: {
                xs: `calc(100vh - ${LAYOUT_CONSTANTS.HEADER_HEIGHT_MOBILE}px)`,
                md: `calc(100vh - ${LAYOUT_CONSTANTS.HEADER_HEIGHT_DESKTOP}px)`,
              },
              transition: "width 225ms cubic-bezier(0.4, 0, 0.2, 1)",
              overflowX: "hidden",
              bgcolor: "background.paper",
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
            borderRight: `1px solid ${theme.palette.divider}`,
            bgcolor: "background.paper",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
