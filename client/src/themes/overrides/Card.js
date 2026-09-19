import { alpha } from "@mui/material/styles";

/**
 * Card Component Overrides
 */
export const Card = (theme) => {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: "none",
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[1],
          transition: "all 0.25s ease-in-out",
          "&:hover": {
            borderColor: theme.palette.divider,
            boxShadow: theme.shadows[3],
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "20px 24px",
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
        title: {
          fontSize: "1.05rem",
          fontWeight: 700,
          letterSpacing: "-0.01em",
        },
        subheader: {
          fontSize: "0.8125rem",
          marginTop: "2px",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "24px",
          "&:last-child": {
            paddingBottom: "24px",
          },
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: "16px 24px",
          borderTop: `1px solid ${theme.palette.divider}`,
        },
      },
    },
  };
};

export default Card;
