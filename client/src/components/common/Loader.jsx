import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  CircularProgress,
  Typography,
  LinearProgress,
} from "@mui/material";

/**
 * Loader Component (Arrow function)
 */
export const Loader = ({
  type = "circular",
  size = 40,
  message,
  fullPage = false,
  minHeight = 240,
  sx,
}) => {
  if (type === "linear") {
    return (
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 2000,
          ...sx,
        }}
      >
        <LinearProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        minHeight: fullPage ? "100vh" : minHeight,
        width: "100%",
        bgcolor: fullPage ? "background.default" : "transparent",
        p: 3,
        ...sx,
      }}
    >
      <CircularProgress
        size={size}
        thickness={4}
        sx={{
          color: "primary.main",
        }}
      />
      {message && (
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

Loader.propTypes = {
  type: PropTypes.oneOf(["circular", "linear"]),
  size: PropTypes.number,
  message: PropTypes.string,
  fullPage: PropTypes.bool,
  minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sx: PropTypes.object,
};

export default Loader;
