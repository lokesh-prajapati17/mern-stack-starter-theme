import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { FolderOpen } from "lucide-react";
import Button from "./Button";

/**
 * EmptyState Component (Arrow function)
 */
export const EmptyState = ({
  icon: Icon = FolderOpen,
  title = "No Data Available",
  description = "There are currently no items to display.",
  actionText,
  onAction,
  sx,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 5,
        borderRadius: (theme) => `${theme.shape.borderRadius}px`,
        border: (theme) => `1px dashed ${theme.palette.divider}`,
        bgcolor: "action.hover",
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 64,
          height: 64,
          borderRadius: "50%",
          bgcolor: "action.selected",
          color: "primary.main",
          mb: 2,
        }}
      >
        <Icon size={32} />
      </Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ maxWidth: 400, mb: actionText ? 3 : 0 }}
      >
        {description}
      </Typography>
      {actionText && onAction && (
        <Button variant="contained" color="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </Box>
  );
};

EmptyState.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.node,
  description: PropTypes.node,
  actionText: PropTypes.string,
  onAction: PropTypes.func,
  sx: PropTypes.object,
};

export default EmptyState;
