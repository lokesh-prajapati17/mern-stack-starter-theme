import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Typography,
} from "@mui/material";

/**
 * CardBox Component (Arrow function)
 * Guaranteed full-width container respecting responsive layout tokens.
 */
export const CardBox = ({
  title,
  subtitle,
  action,
  headerAction,
  footer,
  children,
  noPadding = false,
  divider = false,
  sx,
  contentSx,
  ...props
}) => {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: (theme) => `${theme.shape.borderRadius}px`,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        bgcolor: "background.paper",
        boxShadow: (theme) => theme.customShadows?.card || theme.shadows[1],
        transition: "all 0.25s ease-in-out",
        "&:hover": {
          boxShadow: (theme) =>
            theme.customShadows?.cardHover || theme.shadows[3],
        },
        ...sx,
      }}
      {...props}
    >
      {(title || subtitle || action || headerAction) && (
        <>
          <CardHeader
            title={
              typeof title === "string" ? (
                <Typography variant="subtitle1" fontWeight={700}>
                  {title}
                </Typography>
              ) : (
                title
              )
            }
            subheader={
              typeof subtitle === "string" ? (
                <Typography variant="caption" color="text.secondary">
                  {subtitle}
                </Typography>
              ) : (
                subtitle
              )
            }
            action={action || headerAction}
            sx={{
              p: { xs: 2, sm: 2.5 },
              "& .MuiCardHeader-action": {
                m: 0,
                alignSelf: "center",
              },
            }}
          />
          {divider && <Divider />}
        </>
      )}

      <CardContent
        sx={{
          p: noPadding ? 0 : { xs: 2, sm: 2.5 },
          "&:last-child": {
            pb: noPadding ? 0 : { xs: 2, sm: 2.5 },
          },
          ...contentSx,
        }}
      >
        {children}
      </CardContent>

      {footer && (
        <>
          <Divider />
          <CardActions
            sx={{ p: { xs: 1.5, sm: 2 }, justifyContent: "flex-end" }}
          >
            {footer}
          </CardActions>
        </>
      )}
    </Card>
  );
};

CardBox.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  action: PropTypes.node,
  headerAction: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node,
  noPadding: PropTypes.bool,
  divider: PropTypes.bool,
  sx: PropTypes.object,
  contentSx: PropTypes.object,
};

export default CardBox;
