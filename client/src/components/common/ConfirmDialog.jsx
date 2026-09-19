import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import Button from "./Button";

/**
 * ConfirmDialog Component (Arrow function)
 */
export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning",
  loading = false,
}) => {
  const theme = useTheme();

  const getIcon = () => {
    switch (type) {
      case "error":
      case "danger":
        return <AlertTriangle size={24} color={theme.palette.error.main} />;
      case "warning":
        return <AlertTriangle size={24} color={theme.palette.warning.main} />;
      case "success":
        return <CheckCircle2 size={24} color={theme.palette.success.main} />;
      case "info":
      default:
        return <Info size={24} color={theme.palette.info.main} />;
    }
  };

  const getConfirmColor = () => {
    if (type === "danger" || type === "error") return "error";
    if (type === "warning") return "warning";
    return "primary";
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ p: 2.5, pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {getIcon()}
          <Typography variant="h5" fontWeight={700}>
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 2.5, pt: 1 }}>
        <DialogContentText color="text.secondary" variant="body2">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          disabled={loading}
        >
          {cancelText}
        </Button>
        <Button
          variant="contained"
          color={getConfirmColor()}
          onClick={onConfirm}
          loading={loading}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.node,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  type: PropTypes.oneOf(["warning", "danger", "error", "info", "success"]),
  loading: PropTypes.bool,
};

export default ConfirmDialog;
