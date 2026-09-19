import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Stepper as MuiStepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Check } from "lucide-react";

const ThemedConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 16,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.divider,
    borderTopWidth: 2,
    borderRadius: 1,
    transition: "border-color 0.3s ease",
  },
}));

const ThemedStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  width: 34,
  height: 34,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  fontSize: theme.typography.caption.fontSize,
  transition: "all 0.25s ease",

  ...(ownerState.completed && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.15)}`,
  }),

  ...(ownerState.active && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: `0 0 0 6px ${alpha(theme.palette.primary.main, 0.2)}`,
  }),

  ...(!ownerState.active && !ownerState.completed && {
    backgroundColor: alpha(theme.palette.action.hover, 1),
    border: `2px solid ${theme.palette.divider}`,
    color: theme.palette.text.secondary,
  }),
}));

const ThemedStepIcon = ({ active, completed, icon }) => (
  <ThemedStepIconRoot ownerState={{ active, completed }}>
    {completed ? <Check size={16} strokeWidth={2.5} /> : icon}
  </ThemedStepIconRoot>
);

/**
 * StepProgress — Multi-step wizard progress indicator.
 * Supports horizontal and vertical orientations.
 */
export const StepProgress = ({
  steps = [],
  activeStep = 0,
  orientation = "horizontal",
  alternativeLabel = false,
  sx,
}) => {
  const theme = useTheme();

  return (
    <Box sx={sx}>
      <MuiStepper
        activeStep={activeStep}
        orientation={orientation}
        alternativeLabel={alternativeLabel && orientation === "horizontal"}
        connector={<ThemedConnector />}
        sx={{ bgcolor: "transparent" }}
      >
        {steps.map((step, idx) => (
          <Step key={idx} completed={idx < activeStep}>
            <StepLabel
              StepIconComponent={ThemedStepIcon}
              optional={
                step.optional && (
                  <Typography variant="caption" color="text.secondary">
                    Optional
                  </Typography>
                )
              }
              sx={{
                "& .MuiStepLabel-label": {
                  fontWeight: idx === activeStep ? 700 : 500,
                  color:
                    idx === activeStep
                      ? "text.primary"
                      : idx < activeStep
                        ? theme.palette.primary.main
                        : "text.secondary",
                  fontSize: theme.typography.body2.fontSize,
                  mt: alternativeLabel ? 0.75 : 0,
                },
              }}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </MuiStepper>
    </Box>
  );
};

StepProgress.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      optional: PropTypes.bool,
    }),
  ).isRequired,
  activeStep: PropTypes.number,
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  alternativeLabel: PropTypes.bool,
  sx: PropTypes.object,
};

export default StepProgress;
