/**
 * Menu Component Overrides
 */
export const Menu = (theme) => {
  return {
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 10,
          boxShadow: theme.customShadows?.dropdown || theme.shadows[8],
          border: `1px solid ${theme.palette.divider}`,
          backgroundImage: "none",
          padding: "6px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          borderRadius: 6,
          padding: "8px 12px",
          margin: "2px 0",
          transition: "background-color 0.15s ease",
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
          "&.Mui-selected": {
            backgroundColor: theme.palette.action.selected,
            color: theme.palette.primary.main,
            fontWeight: 600,
          },
        },
      },
    },
  };
};

export default Menu;
