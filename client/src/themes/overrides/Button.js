import { alpha } from "@mui/material/styles";

/**
 * Button Component Overrides
 */
export const Button = (theme) => {
  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
          textTransform: "none",
          padding: "8px 18px",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:active": {
            transform: "scale(0.98)",
          },
        },
        sizeSmall: {
          padding: "5px 12px",
          fontSize: "0.8125rem",
        },
        sizeLarge: {
          padding: "10px 24px",
          fontSize: "0.9375rem",
        },
        containedPrimary: {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.25)}`,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`,
          },
        },
        containedSecondary: {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
          },
        },
        containedSuccess: {
          backgroundColor: theme.palette.success.main,
          color: theme.palette.success.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.success.dark,
          },
        },
        containedWarning: {
          backgroundColor: theme.palette.warning.main,
          color: theme.palette.warning.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.warning.dark,
          },
        },
        containedError: {
          backgroundColor: theme.palette.error.main,
          color: theme.palette.error.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.error.dark,
          },
        },
        outlined: {
          borderColor: theme.palette.divider,
          "&:hover": {
            borderColor: theme.palette.text.secondary,
            backgroundColor: theme.palette.action.hover,
          },
        },
        outlinedPrimary: {
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          "&:hover": {
            borderColor: theme.palette.primary.dark,
            backgroundColor: theme.palette.action.hover,
          },
        },
        textPrimary: {
          color: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: "all 0.2s ease-in-out",
        },
        colorDefault: {
          color: theme.palette.text.secondary,
          "&:hover": {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.action.hover,
          },
        },
        colorPrimary: {
          color: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
          },
        },
        colorSecondary: {
          color: theme.palette.secondary.main,
          "&:hover": {
            backgroundColor: alpha(theme.palette.secondary.main, 0.08),
          },
        },
        colorSuccess: {
          color: theme.palette.success.main,
          "&:hover": {
            backgroundColor: alpha(theme.palette.success.main, 0.08),
          },
        },
        colorError: {
          color: theme.palette.error.main,
          "&:hover": {
            backgroundColor: alpha(theme.palette.error.main, 0.08),
          },
        },
        colorWarning: {
          color: theme.palette.warning.main,
          "&:hover": {
            backgroundColor: alpha(theme.palette.warning.main, 0.08),
          },
        },
        colorInfo: {
          color: theme.palette.info.main,
          "&:hover": {
            backgroundColor: alpha(theme.palette.info.main, 0.08),
          },
        },
      },
    },
  };
};

export default Button;
