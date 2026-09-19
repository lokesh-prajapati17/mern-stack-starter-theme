/**
 * Drawer Component Overrides
 */
export const Drawer = (theme) => {
  return {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          backgroundImage: "none",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: "all 0.15s ease-in-out",
          "&.Mui-selected": {
            backgroundColor: theme.palette.action.selected,
            color: theme.palette.primary.main,
            "& .MuiListItemIcon-root": {
              color: theme.palette.primary.main,
            },
            "&:hover": {
              backgroundColor: theme.palette.action.selected,
            },
          },
        },
      },
    },
  };
};

export default Drawer;
