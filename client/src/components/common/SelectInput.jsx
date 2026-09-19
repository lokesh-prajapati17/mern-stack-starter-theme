import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

export const SelectInput = forwardRef(
  (
    {
      label,
      value,
      onChange,
      options = [],
      placeholder,
      helperText,
      error = false,
      fullWidth = true,
      size = "small",
      required = false,
      disabled = false,
      sx,
      ...props
    },
    ref,
  ) => {
    const labelId = `select-label-${label?.replace(/\s+/g, "-").toLowerCase()}`;

    return (
      <FormControl
        fullWidth={fullWidth}
        size={size}
        error={error}
        required={required}
        disabled={disabled}
        sx={sx}
      >
        {label && <InputLabel id={labelId}>{label}</InputLabel>}
        <Select
          ref={ref}
          labelId={labelId}
          value={value}
          label={label}
          onChange={onChange}
          {...props}
        >
          {placeholder && (
            <MenuItem value="" disabled>
              <em>{placeholder}</em>
            </MenuItem>
          )}
          {options.map((opt) => (
            <MenuItem
              key={typeof opt === "object" ? opt.value : opt}
              value={typeof opt === "object" ? opt.value : opt}
            >
              {typeof opt === "object" ? opt.label : opt}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  },
);

SelectInput.displayName = "SelectInput";

SelectInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({
        value: PropTypes.any.isRequired,
        label: PropTypes.node.isRequired,
      }),
    ]),
  ),
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium"]),
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  sx: PropTypes.object,
};

export default SelectInput;
