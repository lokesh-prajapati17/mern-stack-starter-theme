import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Chip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

/**
 * TagInput (read-only display) — renders a list of tags as themed chips.
 * For controlled interactive tag entry, pair with TextInput and onKeyDown.
 */
export const TagList = ({
  tags = [],
  color = "primary",
  size = "small",
  onDelete,
  maxVisible,
  sx,
}) => {
  const theme = useTheme();
  const paletteColor = theme.palette[color] || theme.palette.primary;
  const visible = maxVisible ? tags.slice(0, maxVisible) : tags;
  const overflow = maxVisible ? tags.length - maxVisible : 0;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, ...sx }}>
      {visible.map((tag, idx) => (
        <Chip
          key={idx}
          label={typeof tag === "object" ? tag.label : tag}
          size={size}
          onDelete={onDelete ? () => onDelete(tag, idx) : undefined}
          sx={{
            bgcolor: alpha(paletteColor.main, 0.1),
            color: paletteColor.main,
            border: `1px solid ${alpha(paletteColor.main, 0.22)}`,
            fontWeight: 600,
            fontSize: theme.typography.caption.fontSize,
            "& .MuiChip-deleteIcon": {
              color: alpha(paletteColor.main, 0.6),
              "&:hover": { color: paletteColor.main },
            },
          }}
        />
      ))}
      {overflow > 0 && (
        <Chip
          label={`+${overflow} more`}
          size={size}
          sx={{
            bgcolor: "action.hover",
            color: "text.secondary",
            fontWeight: 600,
            fontSize: theme.typography.caption.fontSize,
            border: (t) => `1px solid ${t.palette.divider}`,
          }}
        />
      )}
    </Box>
  );
};

TagList.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ label: PropTypes.string }),
    ]),
  ),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "error",
    "info",
  ]),
  size: PropTypes.oneOf(["small", "medium"]),
  onDelete: PropTypes.func,
  maxVisible: PropTypes.number,
  sx: PropTypes.object,
};

export default TagList;
