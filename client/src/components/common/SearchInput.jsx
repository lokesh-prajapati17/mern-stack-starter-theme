import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment, IconButton, Tooltip } from "@mui/material";
import { Search, X } from "lucide-react";

export const SearchInput = forwardRef(
  (
    {
      value,
      onChange,
      onClear,
      placeholder = "Search...",
      size = "small",
      fullWidth = true,
      sx,
      ...props
    },
    ref,
  ) => {
    const handleClear = () => {
      if (onClear) {
        onClear();
      } else if (onChange) {
        onChange({ target: { value: "" } });
      }
    };

    return (
      <TextField
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        size={size}
        fullWidth={fullWidth}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ color: "text.secondary" }}>
                <Search size={18} />
              </InputAdornment>
            ),
            endAdornment: value ? (
              <InputAdornment position="end">
                <Tooltip title="Clear search" arrow>
                  <IconButton
                    size="small"
                    onClick={handleClear}
                    edge="end"
                    sx={{ color: "text.secondary" }}
                  >
                    <X size={16} />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ) : undefined,
          },
        }}
        sx={{
          width: "100%",
          ...sx,
        }}
        {...props}
      />
    );
  },
);

SearchInput.displayName = "SearchInput";

SearchInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium"]),
  fullWidth: PropTypes.bool,
  sx: PropTypes.object,
};

export default SearchInput;
