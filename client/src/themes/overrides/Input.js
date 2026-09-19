import { alpha } from "@mui/material/styles";

/**
 * Input Component Overrides with crisp, modern border radius
 */
export const Input = (theme) => {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          borderRadius: 4,
          "&.Mui-disabled": {
            "& svg": { color: theme.palette.text.disabled },
          },
        },
        input: {
          padding: "10px 14px",
          "&::placeholder": {
            opacity: 1,
            color: theme.palette.text.disabled,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          color: theme.palette.text.secondary,
          "&.Mui-focused": {
            color: theme.palette.primary.main,
          },
        },
        outlined: {
          lineHeight: "1.15em",
          "&.MuiInputLabel-shrink": {
            background: theme.palette.background.paper,
            padding: "0 4px",
            marginLeft: "-2px",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4, // Reduced crisp border radius for all inputs
          backgroundColor: theme.palette.background.paper,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.divider,
            transition:
              "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.secondary,
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: 1.5,
              borderColor: theme.palette.primary.main,
            },
            boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.18)}`,
          },
          "&.Mui-error": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.error.main,
            },
            "&.Mui-focused": {
              boxShadow: `0 0 0 3px ${alpha(theme.palette.error.main, 0.18)}`,
            },
          },
        },
        input: {
          padding: "10px 14px",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
          marginTop: "4px",
        },
      },
    },
  };
};

export default Input;
