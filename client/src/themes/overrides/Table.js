/**
 * Table Component Overrides
 */
export const Table = (theme) => {
  return {
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: "separate",
          borderSpacing: 0,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.custom?.surfaces?.[2]
              : theme.palette.grey[100],
          "& .MuiTableCell-root": {
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: theme.palette.text.secondary,
            borderBottom: `1px solid ${theme.palette.divider}`,
            padding: "12px 16px",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "14px 16px",
          borderBottom: `1px solid ${theme.palette.divider}`,
          fontSize: "0.875rem",
          color: theme.palette.text.primary,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: "background-color 0.15s ease",
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
};

export default Table;
