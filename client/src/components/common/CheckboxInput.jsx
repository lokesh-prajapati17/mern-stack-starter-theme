import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { FormControlLabel, Checkbox } from "@mui/material";

export const CheckboxInput = forwardRef(
  (
    {
      label,
      checked,
      onChange,
      disabled = false,
      color = "primary",
      sx,
      ...props
    },
    ref,
  ) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            ref={ref}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            color={color}
            sx={{
              borderRadius: (theme) => theme.shape.borderRadius * 0.5,
            }}
            {...props}
          />
        }
        label={label}
        sx={sx}
      />
    );
  },
);

CheckboxInput.displayName = "CheckboxInput";

CheckboxInput.propTypes = {
  label: PropTypes.node.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  sx: PropTypes.object,
};

export default CheckboxInput;
