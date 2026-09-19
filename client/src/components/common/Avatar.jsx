import React from "react";
import PropTypes from "prop-types";
import {
  Avatar as MuiAvatar,
  AvatarGroup as MuiAvatarGroup,
  Box,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

/**
 * Avatar — Single user avatar with optional status indicator and fallback initials.
 */
export const Avatar = ({
  src,
  name,
  size = 40,
  status,
  statusSize = 10,
  sx,
  ...props
}) => {
  const theme = useTheme();

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const statusColors = {
    online: theme.palette.success.main,
    away: theme.palette.warning.main,
    busy: theme.palette.error.main,
    offline: theme.palette.action.disabled,
  };

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <MuiAvatar
        src={src}
        alt={name}
        sx={{
          width: size,
          height: size,
          fontSize: size * 0.38,
          fontWeight: 700,
          bgcolor: src
            ? "transparent"
            : alpha(theme.palette.primary.main, 0.18),
          color: "primary.main",
          border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          ...sx,
        }}
        {...props}
      >
        {!src && initials}
      </MuiAvatar>

      {status && statusColors[status] && (
        <Box
          sx={{
            position: "absolute",
            bottom: 1,
            right: 1,
            width: statusSize,
            height: statusSize,
            borderRadius: "50%",
            bgcolor: statusColors[status],
            border: `2px solid ${theme.palette.background.paper}`,
          }}
        />
      )}
    </Box>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  status: PropTypes.oneOf(["online", "away", "busy", "offline"]),
  statusSize: PropTypes.number,
  sx: PropTypes.object,
};

/**
 * AvatarGroup — Stacked overlapping avatars with overflow count.
 */
export const AvatarGroup = ({
  users = [],
  max = 4,
  size = 36,
  tooltip = true,
  sx,
}) => {
  const theme = useTheme();
  const visible = users.slice(0, max);
  const overflow = users.length - max;

  return (
    <Box sx={{ display: "flex", alignItems: "center", ...sx }}>
      <MuiAvatarGroup
        max={max + 1}
        sx={{
          "& .MuiAvatar-root": {
            width: size,
            height: size,
            fontSize: size * 0.35,
            fontWeight: 700,
            border: `2px solid ${theme.palette.background.paper}`,
            cursor: "default",
          },
        }}
      >
        {visible.map((user, idx) =>
          tooltip ? (
            <Tooltip key={idx} title={user.name || user.email || ""} arrow>
              <MuiAvatar src={user.avatar || user.src} alt={user.name}>
                {!user.avatar &&
                  !user.src &&
                  (user.name || "?")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
              </MuiAvatar>
            </Tooltip>
          ) : (
            <MuiAvatar
              key={idx}
              src={user.avatar || user.src}
              alt={user.name}
            >
              {!user.avatar &&
                !user.src &&
                (user.name || "?")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
            </MuiAvatar>
          ),
        )}
        {overflow > 0 && (
          <MuiAvatar
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.12),
              color: "primary.main",
              fontWeight: 700,
            }}
          >
            +{overflow}
          </MuiAvatar>
        )}
      </MuiAvatarGroup>

      {users.length > 0 && (
        <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
          {users.length} member{users.length !== 1 ? "s" : ""}
        </Typography>
      )}
    </Box>
  );
};

AvatarGroup.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      avatar: PropTypes.string,
      src: PropTypes.string,
    }),
  ),
  max: PropTypes.number,
  size: PropTypes.number,
  tooltip: PropTypes.bool,
  sx: PropTypes.object,
};

export default Avatar;
