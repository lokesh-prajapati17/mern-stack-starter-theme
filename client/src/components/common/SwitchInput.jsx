import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { FormControlLabel, Switch, Box, Typography } from "@mui/material";

export const SwitchInput = forwardRef(
  (
    {
      label,
      description,
      checked,
      onChange,
      disabled = false,
      color = "primary",
      sx,
      ...props
    },
    ref,
  ) => {
    const switchElement = (
      <Switch
        ref={ref}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        color={color}
        {...props}
      />
    );

    if (description) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            bgcolor: "action.hover",
            transition: "border-color 0.15s ease, background-color 0.15s ease",
            ...sx,
          }}
        >
          <Box sx={{ mr: 2 }}>
            <Typography variant="subtitle2" fontWeight={600} color="text.primary">
              {label}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {description}
            </Typography>
          </Box>
          {switchElement}
        </Box>
      );
    }

    return <FormControlLabel control={switchElement} label={label} sx={sx} />;
  },
);

SwitchInput.displayName = "SwitchInput";

SwitchInput.propTypes = {
  label: PropTypes.node.isRequired,
  description: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  sx: PropTypes.object,
};

export default SwitchInput;
