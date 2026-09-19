import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment } from "@mui/material";

export const TextInput = forwardRef(
  (
    {
      label,
      value,
      onChange,
      type = "text",
      placeholder,
      helperText,
      error = false,
      startIcon,
      endIcon,
      fullWidth = true,
      size = "small",
      required = false,
      disabled = false,
      sx,
      ...props
    },
    ref,
  ) => {
    return (
      <TextField
        ref={ref}
        label={label}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        helperText={helperText}
        error={error}
        fullWidth={fullWidth}
        size={size}
        required={required}
        disabled={disabled}
        slotProps={{
          input: {
            startAdornment: startIcon ? (
              <InputAdornment position="start" sx={{ color: "text.secondary" }}>
                {startIcon}
              </InputAdornment>
            ) : undefined,
            endAdornment: endIcon ? (
              <InputAdornment position="end" sx={{ color: "text.secondary" }}>
                {endIcon}
              </InputAdornment>
            ) : undefined,
          },
        }}
        sx={sx}
        {...props}
      />
    );
  },
);

TextInput.displayName = "TextInput";

TextInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium"]),
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  sx: PropTypes.object,
};

export default TextInput;
