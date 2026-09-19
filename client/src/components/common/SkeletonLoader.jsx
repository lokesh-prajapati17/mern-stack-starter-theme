import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Skeleton as MuiSkeleton,
  Stack,
} from "@mui/material";

/**
 * SkeletonLoader — Pre-built skeleton presets for common UI patterns.
 * Variants: card, list, table, stat, profile.
 */
export const SkeletonLoader = ({ variant = "card", rows = 3, sx }) => {
  const cardSkeleton = (
    <Box
      sx={{
        p: 2.5,
        borderRadius: (t) => `${t.shape.borderRadius}px`,
        border: (t) => `1px solid ${t.palette.divider}`,
        bgcolor: "background.paper",
        ...sx,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <MuiSkeleton variant="circular" width={40} height={40} />
        <Box sx={{ flex: 1 }}>
          <MuiSkeleton height={16} width="55%" sx={{ mb: 0.5 }} />
          <MuiSkeleton height={12} width="35%" />
        </Box>
      </Box>
      <MuiSkeleton height={12} sx={{ mb: 0.75 }} />
      <MuiSkeleton height={12} width="85%" sx={{ mb: 0.75 }} />
      <MuiSkeleton height={12} width="65%" />
    </Box>
  );

  const listSkeleton = (
    <Stack spacing={1.5} sx={sx}>
      {Array.from({ length: rows }).map((_, i) => (
        <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <MuiSkeleton variant="circular" width={38} height={38} />
          <Box sx={{ flex: 1 }}>
            <MuiSkeleton height={14} width={`${70 - i * 8}%`} sx={{ mb: 0.5 }} />
            <MuiSkeleton height={11} width={`${45 - i * 5}%`} />
          </Box>
          <MuiSkeleton variant="rounded" width={60} height={24} />
        </Box>
      ))}
    </Stack>
  );

  const tableSkeleton = (
    <Box sx={sx}>
      {/* Table head */}
      <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
        {[30, 20, 20, 15, 15].map((w, i) => (
          <MuiSkeleton key={i} height={14} width={`${w}%`} />
        ))}
      </Box>
      <MuiSkeleton height={1} sx={{ mb: 1 }} />
      {/* Table rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <Box key={i} sx={{ display: "flex", gap: 2, mb: 1.5 }}>
          {[30, 20, 20, 15, 15].map((w, j) => (
            <MuiSkeleton key={j} height={13} width={`${w}%`} />
          ))}
        </Box>
      ))}
    </Box>
  );

  const statSkeleton = (
    <Box
      sx={{
        p: 2.5,
        borderRadius: (t) => `${t.shape.borderRadius}px`,
        border: (t) => `1px solid ${t.palette.divider}`,
        bgcolor: "background.paper",
        display: "flex",
        justifyContent: "space-between",
        ...sx,
      }}
    >
      <Box>
        <MuiSkeleton height={12} width={80} sx={{ mb: 1 }} />
        <MuiSkeleton height={36} width={120} sx={{ mb: 1 }} />
        <MuiSkeleton variant="rounded" height={22} width={70} />
      </Box>
      <MuiSkeleton variant="rounded" width={48} height={48} />
    </Box>
  );

  const profileSkeleton = (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, ...sx }}>
      <MuiSkeleton variant="circular" width={56} height={56} />
      <Box sx={{ flex: 1 }}>
        <MuiSkeleton height={18} width="45%" sx={{ mb: 0.75 }} />
        <MuiSkeleton height={13} width="30%" sx={{ mb: 0.75 }} />
        <MuiSkeleton variant="rounded" height={20} width={80} />
      </Box>
    </Box>
  );

  const map = {
    card: cardSkeleton,
    list: listSkeleton,
    table: tableSkeleton,
    stat: statSkeleton,
    profile: profileSkeleton,
  };

  return map[variant] || cardSkeleton;
};

SkeletonLoader.propTypes = {
  variant: PropTypes.oneOf(["card", "list", "table", "stat", "profile"]),
  rows: PropTypes.number,
  sx: PropTypes.object,
};

export default SkeletonLoader;
