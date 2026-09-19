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
            py: 0.75,
            ...sx,
          }}
        >
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
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
