import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Stack,
  IconButton as MuiIconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

/**
 * Common Pagination Component (Arrow function)
 * Zero hardcoded colors/spacing - strictly theme-driven.
 */
export const Pagination = ({
  page = 1,
  totalPages = 1,
  totalItems = 0,
  rowsPerPage = 10,
  rowsPerPageOptions = [5, 10, 25, 50],
  onPageChange,
  onRowsPerPageChange,
  sx,
}) => {
  const theme = useTheme();

  const startItem = totalItems === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const endItem = Math.min(page * rowsPerPage, totalItems);

  const handlePrev = () => {
    if (page > 1 && onPageChange) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages && onPageChange) {
      onPageChange(page + 1);
    }
  };

  const handleFirst = () => {
    if (page > 1 && onPageChange) {
      onPageChange(1);
    }
  };

  const handleLast = () => {
    if (page < totalPages && onPageChange) {
      onPageChange(totalPages);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 1.5,
        px: { xs: 1.5, sm: 2.5 },
        py: 1.25,
        borderTop: `1px solid ${theme.palette.divider}`,
        bgcolor: "background.paper",
        ...sx,
      }}
    >
      {/* Left side: Rows per page selector */}
      {onRowsPerPageChange ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={500}
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.8125rem" },
              userSelect: "none",
              display: "inline-flex",
              alignItems: "center",
              alignContent: "center",
              lineHeight: 1,
            }}
          >
            <Box
              component="span"
              sx={{ display: { xs: "none", sm: "inline" } }}
            >
              Rows per page:
            </Box>
            <Box
              component="span"
              sx={{ display: { xs: "inline", sm: "none" } }}
            >
              Rows:
            </Box>
          </Typography>
          <Select
            size="small"
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            sx={{
              height: 28,
              fontSize: theme.typography.caption.fontSize,
              borderRadius: `${theme.shape.borderRadius * 0.5}px`,
              "& .MuiSelect-select": {
                py: 0.25,
                px: 1,
                display: "flex",
                alignItems: "center",
                alignContent: "center",
              },
            }}
          >
            {rowsPerPageOptions.map((opt) => (
              <MenuItem key={opt} value={opt} sx={{ fontSize: theme.typography.body2.fontSize }}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </Box>
      ) : (
        <Box />
      )}

      {/* Right side: Page navigation buttons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          gap: 0.5,
        }}
      >
        <Tooltip title="First page" arrow placement="top">
          <span>
            <MuiIconButton
              size="small"
              onClick={handleFirst}
              disabled={page <= 1}
              sx={{
                width: 28,
                height: 28,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: `${theme.shape.borderRadius * 0.5}px`,
                border: `1px solid ${theme.palette.divider}`,
                "&:disabled": { opacity: 0.35 },
              }}
            >
              <ChevronsLeft size={15} />
            </MuiIconButton>
          </span>
        </Tooltip>

        <Tooltip title="Previous page" arrow placement="top">
          <span>
            <MuiIconButton
              size="small"
              onClick={handlePrev}
              disabled={page <= 1}
              sx={{
                width: 28,
                height: 28,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: `${theme.shape.borderRadius * 0.5}px`,
                border: `1px solid ${theme.palette.divider}`,
                "&:disabled": { opacity: 0.35 },
              }}
            >
              <ChevronLeft size={15} />
            </MuiIconButton>
          </span>
        </Tooltip>

        {/* Current Page Badge */}
        <Typography
          variant="caption"
          sx={{
            px: 1,
            py: 0.5,
            fontWeight: 700,
            color: "text.primary",
            userSelect: "none",
            fontSize: theme.typography.body2.fontSize,
            minWidth: 40,
            textAlign: "center",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            lineHeight: 1,
          }}
        >
          {page} / {Math.max(totalPages, 1)}
        </Typography>

        <Tooltip title="Next page" arrow placement="top">
          <span>
            <MuiIconButton
              size="small"
              onClick={handleNext}
              disabled={page >= totalPages}
              sx={{
                width: 28,
                height: 28,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: `${theme.shape.borderRadius * 0.5}px`,
                border: `1px solid ${theme.palette.divider}`,
                "&:disabled": { opacity: 0.35 },
              }}
            >
              <ChevronRight size={15} />
            </MuiIconButton>
          </span>
        </Tooltip>

        <Tooltip title="Last page" arrow placement="top">
          <span>
            <MuiIconButton
              size="small"
              onClick={handleLast}
              disabled={page >= totalPages}
              sx={{
                width: 28,
                height: 28,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: `${theme.shape.borderRadius * 0.5}px`,
                border: `1px solid ${theme.palette.divider}`,
                "&:disabled": { opacity: 0.35 },
              }}
            >
              <ChevronsRight size={15} />
            </MuiIconButton>
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  totalPages: PropTypes.number,
  totalItems: PropTypes.number,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  sx: PropTypes.object,
};

export default Pagination;
