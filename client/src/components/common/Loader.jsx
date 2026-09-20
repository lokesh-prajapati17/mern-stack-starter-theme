import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, useTheme, alpha } from "@mui/material";

/**
 * Modern Branded UI Loader Component
 * Preserves standard container sizing (does not hide header/sidebar)
 * with animated branded orbit, pulsing sonar ring, and bouncing dots.
 */
export const Loader = ({
  type = "circular",
  size = 40,
  message,
  fullPage = false,
  minHeight = 240,
  sx,
}) => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const primaryLight = theme.palette.primary.light;

  if (type === "linear") {
    return (
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          height: 3,
          overflow: "hidden",
          bgcolor: alpha(primaryColor, 0.15),
          "@keyframes linearSlide": {
            "0%": { transform: "translateX(-100%)" },
            "50%": { transform: "translateX(20%)" },
            "100%": { transform: "translateX(200%)" },
          },
          "&::after": {
            content: '""',
            display: "block",
            height: "100%",
            width: "50%",
            background: `linear-gradient(90deg, transparent, ${primaryColor}, ${primaryLight})`,
            boxShadow: `0 0 10px ${primaryColor}`,
            animation: "linearSlide 1.2s infinite ease-in-out",
          },
          ...sx,
        }}
      />
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
        "@keyframes orbitSpin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "@keyframes sonarWave": {
          "0%": {
            transform: "scale(0.85)",
            opacity: 0.7,
          },
          "100%": {
            transform: "scale(1.7)",
            opacity: 0,
          },
        },
        "@keyframes emblemPulse": {
          "0%, 100%": {
            transform: "scale(1)",
            boxShadow: `0 2px 8px ${alpha(primaryColor, 0.25)}`,
          },
          "50%": {
            transform: "scale(1.06)",
            boxShadow: `0 4px 16px ${alpha(primaryColor, 0.45)}`,
          },
        },
        "@keyframes dotBounce": {
          "0%, 80%, 100%": {
            transform: "scale(0)",
            opacity: 0.3,
          },
          "40%": {
            transform: "scale(1)",
            opacity: 1,
          },
        },
        ...sx,
      }}
    >
      {/* Branded Loading Graphic with exact dimensions of previous loader (width: size, height: size) */}
      <Box
        sx={{
          position: "relative",
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Pulsing Sonar Ring */}
        <Box
          sx={{
            position: "absolute",
            inset: -4,
            borderRadius: "50%",
            border: `1.5px solid ${alpha(primaryColor, 0.5)}`,
            animation: "sonarWave 1.8s cubic-bezier(0.2, 0.8, 0.4, 1) infinite",
            pointerEvents: "none",
          }}
        />

        {/* Orbiting Spinner Ring */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2.5px solid transparent",
            borderTopColor: primaryColor,
            borderRightColor: alpha(primaryLight, 0.8),
            animation:
              "orbitSpin 0.9s cubic-bezier(0.55, 0.15, 0.45, 0.85) infinite",
          }}
        />

        {/* Central Branded M Emblem Badge */}
        <Box
          sx={{
            width: size * 0.55,
            height: size * 0.55,
            borderRadius: "6px",
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${theme.palette.primary.dark} 100%)`,
            color: theme.palette.primary.contrastText,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: `${Math.max(10, size * 0.3)}px`,
            letterSpacing: "-0.2px",
            animation: "emblemPulse 2s ease-in-out infinite",
            zIndex: 1,
          }}
        >
          M
        </Box>
      </Box>

      {/* Message & Animated Dots */}
      {message && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={600}
            sx={{ letterSpacing: "-0.1px" }}
          >
            {message}
          </Typography>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.35,
              ml: 0.25,
            }}
          >
            <Box
              sx={{
                width: 3.5,
                height: 3.5,
                borderRadius: "50%",
                bgcolor: primaryColor,
                animation: "dotBounce 1.4s infinite ease-in-out",
                animationDelay: "0s",
              }}
            />
            <Box
              sx={{
                width: 3.5,
                height: 3.5,
                borderRadius: "50%",
                bgcolor: primaryColor,
                animation: "dotBounce 1.4s infinite ease-in-out",
                animationDelay: "0.2s",
              }}
            />
            <Box
              sx={{
                width: 3.5,
                height: 3.5,
                borderRadius: "50%",
                bgcolor: primaryColor,
                animation: "dotBounce 1.4s infinite ease-in-out",
                animationDelay: "0.4s",
              }}
            />
          </Box>
        </Box>
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
