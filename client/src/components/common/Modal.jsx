import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Divider,
  Tooltip,
} from "@mui/material";
import { X } from "lucide-react";

/**
 * Modal Dialog Component (Arrow function)
 */
export const Modal = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  actions,
  maxWidth = "sm",
  fullWidth = true,
  disableBackdropClick = false,
  sx,
  ...props
}) => {
  const handleClose = (event, reason) => {
    if (disableBackdropClick && reason === "backdropClick") {
      return;
    }
    if (onClose) onClose(event, reason);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      sx={sx}
      {...props}
    >
      {title && (
        <>
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2.5,
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="caption" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
            {onClose && (
              <Tooltip title="Close" arrow>
                <IconButton
                  size="small"
                  onClick={onClose}
                  aria-label="Close dialog"
                  sx={{
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
          </DialogTitle>
          <Divider />
        </>
      )}

      <DialogContent sx={{ p: 2.5 }}>{children}</DialogContent>

      {actions && (
        <>
          <Divider />
          <DialogActions sx={{ p: 2, gap: 1 }}>{actions}</DialogActions>
        </>
      )}
    </Dialog>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  children: PropTypes.node,
  actions: PropTypes.node,
  maxWidth: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  fullWidth: PropTypes.bool,
  disableBackdropClick: PropTypes.bool,
  sx: PropTypes.object,
};

export default Modal;
