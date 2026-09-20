import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import {
  Box,
  Typography,
  Stack,
  Divider,
  Grid,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { StepProgress } from "../common/StepProgress";
import { Button } from "../common/Button";
import { FormikField } from "./FormikField";
import { MotionFadeIn } from "../common/Motion";

/**
 * FormWizard — Enterprise Multi-Step Dynamic Form Wizard
 * Supports step-by-step Yup validation, step transition animations,
 * state persistence across steps, and custom review/confirmation.
 */
export const FormWizard = ({
  steps = [],
  initialValues = {},
  onSubmit,
  onStepChange,
  showStepDescriptions = true,
  submitLabel = "Submit Application",
  completedMessage = "Form completed successfully!",
  loading = false,
  errorAlert = null,
  sx,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [accumulatedValues, setAccumulatedValues] = useState(initialValues);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStep = steps[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  // Flatten all initial values from all step field definitions
  const allInitialValues = React.useMemo(() => {
    const defaults = { ...initialValues, ...accumulatedValues };
    steps.forEach((step) => {
      if (Array.isArray(step.fields)) {
        step.fields.forEach((f) => {
          if (defaults[f.name] === undefined) {
            if (f.defaultValue !== undefined) {
              defaults[f.name] = f.defaultValue;
            } else if (f.type === "checkbox" || f.type === "switch") {
              defaults[f.name] = false;
            } else if (f.type === "file" || f.type === "dropzone") {
              defaults[f.name] = f.multiple ? [] : null;
            } else {
              defaults[f.name] = "";
            }
          }
        });
      }
    });
    return defaults;
  }, [steps, initialValues, accumulatedValues]);

  // Handle advancing to the next step or final submit
  const handleStepSubmit = async (values, formikHelpers) => {
    const updatedValues = { ...accumulatedValues, ...values };
    setAccumulatedValues(updatedValues);

    if (isLastStep) {
      if (onSubmit) {
        await onSubmit(updatedValues, formikHelpers);
      }
      setIsCompleted(true);
    } else {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      if (onStepChange) onStepChange(nextStep, updatedValues);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      const prevStep = activeStep - 1;
      setActiveStep(prevStep);
      if (onStepChange) onStepChange(prevStep, accumulatedValues);
    }
  };

  if (isCompleted) {
    return (
      <MotionFadeIn>
        <Card
          sx={{
            p: { xs: 2.5, sm: 4 },
            textAlign: "center",
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            bgcolor: "background.paper",
            ...sx,
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              bgcolor: "success.main",
              color: "success.contrastText",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Check size={28} strokeWidth={2.5} />
          </Box>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Success!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {completedMessage}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setIsCompleted(false);
              setActiveStep(0);
              setAccumulatedValues(initialValues);
            }}
          >
            Start Over
          </Button>
        </Card>
      </MotionFadeIn>
    );
  }

  return (
    <Box sx={{ width: "100%", ...sx }}>
      {/* Top Step Progress Bar */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <StepProgress
          steps={steps.map((s) => ({ label: s.label, optional: s.optional }))}
          activeStep={activeStep}
          alternativeLabel
        />
      </Box>

      {errorAlert && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorAlert}
        </Alert>
      )}

      {/* Formik Form Container for current step */}
      <Formik
        key={`wizard-step-${activeStep}`}
        initialValues={allInitialValues}
        validationSchema={currentStep?.validationSchema}
        onSubmit={handleStepSubmit}
        enableReinitialize
      >
        {(formikProps) => {
          const { isSubmitting } = formikProps;
          const isBusy = loading || isSubmitting;

          return (
            <Form noValidate>
              <MotionFadeIn key={`step-content-${activeStep}`}>
                <Box
                  sx={{
                    p: { xs: 2.5, sm: 3.5 },
                    borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    bgcolor: "background.paper",
                  }}
                >
                  {/* Step Title & Description Header */}
                  <Box sx={{ mb: 2.5 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.25,
                        mb: 0.75,
                        flexWrap: "wrap",
                      }}
                    >
                      <Box
                        sx={{
                          px: 1.25,
                          py: 0.35,
                          borderRadius: "12px",
                          bgcolor: "primary.main",
                          color: "primary.contrastText",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Step {activeStep + 1} of {steps.length}
                      </Box>
                      <Typography variant="h6" fontWeight={700} color="text.primary">
                        {currentStep?.label}
                      </Typography>
                    </Box>
                    {showStepDescriptions && currentStep?.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {currentStep.description}
                      </Typography>
                    )}
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  {/* Step Content: Custom render component or Declarative fields */}
                  {currentStep?.component ? (
                    currentStep.component(formikProps)
                  ) : (
                    <Grid container spacing={2.5}>
                      {(currentStep?.fields || []).map((field) => {
                        const sizeProp = field.size || field.grid || { xs: 12 };
                        const { grid, size, ...fieldProps } = field;

                        return (
                          <Grid size={sizeProp} key={field.name}>
                            <FormikField {...fieldProps} />
                          </Grid>
                        );
                      })}
                    </Grid>
                  )}

                  {/* Navigation Actions Footer */}
                  <Box
                    sx={{
                      mt: 3.5,
                      pt: 2.5,
                      borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 1.5,
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleBack}
                      disabled={activeStep === 0 || isBusy}
                      startIcon={<ArrowLeft size={16} />}
                    >
                      Back
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      loading={isBusy}
                      endIcon={
                        isLastStep ? (
                          <Check size={16} />
                        ) : (
                          <ArrowRight size={16} />
                        )
                      }
                    >
                      {isLastStep ? submitLabel : "Continue"}
                    </Button>
                  </Box>
                </Box>
              </MotionFadeIn>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

FormWizard.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string.isRequired,
      description: PropTypes.string,
      optional: PropTypes.bool,
      validationSchema: PropTypes.object,
      fields: PropTypes.array,
      component: PropTypes.func,
    }),
  ).isRequired,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onStepChange: PropTypes.func,
  showStepDescriptions: PropTypes.bool,
  submitLabel: PropTypes.string,
  completedMessage: PropTypes.string,
  loading: PropTypes.bool,
  errorAlert: PropTypes.string,
  sx: PropTypes.object,
};

export default FormWizard;
