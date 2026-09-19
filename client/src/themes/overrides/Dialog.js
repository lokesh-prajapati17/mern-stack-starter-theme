/**
 * Dialog Component Overrides
 */
export const Dialog = (theme) => {
  return {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 14,
          boxShadow: theme.customShadows?.dialog || theme.shadows[16],
          backgroundImage: "none",
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "1.125rem",
          fontWeight: 700,
          padding: "20px 24px",
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "16px 24px",
          borderTop: `1px solid ${theme.palette.divider}`,
        },
      },
    },
  };
};

export default Dialog;
