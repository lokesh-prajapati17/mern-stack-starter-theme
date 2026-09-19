import { alpha } from "@mui/material/styles";

/**
 * Chip Component Overrides
 */
export const Chip = (theme) => {
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 600,
          fontSize: "0.75rem",
        },
        sizeSmall: {
          height: 22,
          fontSize: "0.6875rem",
        },
        sizeMedium: {
          height: 28,
        },
        filled: {
          border: "1px solid transparent",
        },
        colorPrimary: {
          backgroundColor: alpha(theme.palette.primary.main, 0.12),
          color: theme.palette.primary.main,
          borderColor: alpha(theme.palette.primary.main, 0.25),
        },
        colorSecondary: {
          backgroundColor: alpha(theme.palette.secondary.main, 0.12),
          color: theme.palette.secondary.main,
          borderColor: alpha(theme.palette.secondary.main, 0.25),
        },
        colorSuccess: {
          backgroundColor: alpha(theme.palette.success.main, 0.12),
          color: theme.palette.success.main,
          borderColor: alpha(theme.palette.success.main, 0.25),
        },
        colorWarning: {
          backgroundColor: alpha(theme.palette.warning.main, 0.12),
          color: theme.palette.warning.main,
          borderColor: alpha(theme.palette.warning.main, 0.25),
        },
        colorError: {
          backgroundColor: alpha(theme.palette.error.main, 0.12),
          color: theme.palette.error.main,
          borderColor: alpha(theme.palette.error.main, 0.25),
        },
        colorInfo: {
          backgroundColor: alpha(theme.palette.info.main, 0.12),
          color: theme.palette.info.main,
          borderColor: alpha(theme.palette.info.main, 0.25),
        },
      },
    },
  };
};

export default Chip;
