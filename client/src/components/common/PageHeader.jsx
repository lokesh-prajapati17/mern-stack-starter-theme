import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Breadcrumbs as MuiBreadcrumbs,
  Link,
} from "@mui/material";
import { ChevronRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * PageHeader — Top-of-page title area with breadcrumbs, subtitle, and action slot.
 * Integrates with react-router-dom for breadcrumb navigation.
 */
export const PageHeader = ({
  title,
  subtitle,
  breadcrumbs = [],
  actions,
  showHome = true,
  sx,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: 2, sm: 1 },
        mb: 3,
        ...sx,
      }}
    >
      {/* Left: Title + Breadcrumbs */}
      <Box>
        {breadcrumbs.length > 0 && (
          <MuiBreadcrumbs
            separator={<ChevronRight size={14} />}
            aria-label="page breadcrumb"
            sx={{ mb: 0.5, "& .MuiBreadcrumbs-separator": { mx: 0.5 } }}
          >
            {showHome && (
              <Link
                component="button"
                variant="caption"
                color="text.secondary"
                underline="hover"
                onClick={() => navigate("/")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.3,
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                <Home size={13} />
                Home
              </Link>
            )}
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return isLast ? (
                <Typography
                  key={idx}
                  variant="caption"
                  color="primary"
                  fontWeight={600}
                >
                  {crumb.label}
                </Typography>
              ) : (
                <Link
                  key={idx}
                  component="button"
                  variant="caption"
                  color="text.secondary"
                  underline="hover"
                  onClick={() => crumb.path && navigate(crumb.path)}
                  sx={{ cursor: crumb.path ? "pointer" : "default", fontWeight: 500 }}
                >
                  {crumb.label}
                </Link>
              );
            })}
          </MuiBreadcrumbs>
        )}

        <Typography variant="h4" fontWeight={800} lineHeight={1.2}>
          {title}
        </Typography>

        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Right: Action slot */}
      {actions && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexShrink: 0,
          }}
        >
          {actions}
        </Box>
      )}
    </Box>
  );
};

PageHeader.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string,
    }),
  ),
  actions: PropTypes.node,
  showHome: PropTypes.bool,
  sx: PropTypes.object,
};

export default PageHeader;
