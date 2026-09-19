import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import { X } from "lucide-react";

/**
 * Drawer (Side Panel) — Slide-in panel for forms, details, and secondary views.
 * Supports left/right anchor, header, footer, and optional close-on-backdrop.
 */
export const SidePanel = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  anchor = "right",
  width = 480,
  disableBackdropClick = false,
  sx,
  ...props
}) => {
  const handleClose = (event, reason) => {
    if (disableBackdropClick && reason === "backdropClick") return;
    if (onClose) onClose();
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor={anchor}
      sx={{
        zIndex: (theme) => theme.zIndex.modal,
      }}
      PaperProps={{
        sx: {
          width: { xs: "100vw", sm: width },
          bgcolor: "background.paper",
          backgroundImage: "none",
          display: "flex",
          flexDirection: "column",
          ...sx,
        },
      }}
      {...props}
    >
      {/* Header */}
      {title && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              px: 3,
              py: 2.5,
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="h6" fontWeight={700} noWrap>
                {title}
              </Typography>
              {subtitle && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 0.25, display: "block" }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>

            {onClose && (
              <Tooltip title="Close" arrow>
                <IconButton
                  size="small"
                  onClick={onClose}
                  aria-label="Close side panel"
                  sx={{
                    ml: 1,
                    color: "text.secondary",
                    "&:hover": {
                      color: "text.primary",
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <X size={18} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Divider />
        </>
      )}

      {/* Scrollable content */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 3, py: 2.5 }}>{children}</Box>

      {/* Sticky footer */}
      {footer && (
        <>
          <Divider />
          <Box
            sx={{
              px: 3,
              py: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 1,
              flexShrink: 0,
            }}
          >
            {footer}
          </Box>
        </>
      )}
    </Drawer>
  );
};

SidePanel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.node,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node,
  anchor: PropTypes.oneOf(["left", "right", "top", "bottom"]),
  width: PropTypes.number,
  disableBackdropClick: PropTypes.bool,
  sx: PropTypes.object,
};

export default SidePanel;
