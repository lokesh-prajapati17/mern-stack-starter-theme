import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { Grid, Box, Alert, Stack } from "@mui/material";
import { FormikField } from "./FormikField";
import { Button } from "../common/Button";

/**
 * DynamicForm — Declarative Schema-Driven Form Engine
 * Renders fully validated forms with responsive grid layouts using Yup & Formik.
 */
export const DynamicForm = ({
  fields = [],
  initialValues,
  validationSchema,
  onSubmit,
  onReset,
  submitLabel = "Submit",
  submitIcon,
  cancelLabel,
  onCancel,
  showReset = false,
  resetLabel = "Reset",
  loading = false,
  errorAlert = null,
  spacing = 2,
  actions,
  children,
  sx,
}) => {
  // Auto-generate default initial values if not provided
  const computedInitialValues = React.useMemo(() => {
    if (initialValues) return initialValues;
    const defaults = {};
    fields.forEach((f) => {
      if (f.defaultValue !== undefined) {
        defaults[f.name] = f.defaultValue;
      } else if (f.type === "checkbox" || f.type === "switch") {
        defaults[f.name] = false;
      } else if (f.type === "file" || f.type === "dropzone") {
        defaults[f.name] = f.multiple ? [] : null;
      } else {
        defaults[f.name] = "";
      }
    });
    return defaults;
  }, [fields, initialValues]);

  return (
    <Formik
      initialValues={computedInitialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formikProps) => {
        const { isSubmitting, resetForm, dirty } = formikProps;
        const isBusy = loading || isSubmitting;

        const handleReset = () => {
          resetForm();
          if (onReset) onReset();
        };

        return (
          <Form noValidate style={{ width: "100%" }}>
            <Box sx={{ width: "100%", ...sx }}>
              {errorAlert && (
                <Alert severity="error" sx={{ mb: 2.5 }}>
                  {errorAlert}
                </Alert>
              )}

              <Grid container spacing={spacing}>
                {fields.map((field) => {
                  const sizeProp = field.size || field.grid || { xs: 12 };
                  const { grid, size, ...fieldProps } = field;

                  return (
                    <Grid size={sizeProp} key={field.name}>
                      <FormikField {...fieldProps} />
                    </Grid>
                  );
                })}
              </Grid>

              {/* Extra children rendered inside the form (e.g. custom banners or dividers) */}
              {children}

              {/* Form Action Controls */}
              {actions ? (
                typeof actions === "function" ? (
                  actions(formikProps)
                ) : (
                  actions
                )
              ) : (
                <Stack
                  direction={{ xs: "column-reverse", sm: "row" }}
                  spacing={1.5}
                  justifyContent="flex-end"
                  alignItems="center"
                  sx={{
                    mt: 3.5,
                    pt: 2.5,
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                >
                  {onCancel && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={onCancel}
                      disabled={isBusy}
                      fullWidth={{ xs: true, sm: false }}
                    >
                      {cancelLabel || "Cancel"}
                    </Button>
                  )}

                  {showReset && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleReset}
                      disabled={isBusy || !dirty}
                      fullWidth={{ xs: true, sm: false }}
                    >
                      {resetLabel}
                    </Button>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    loading={isBusy}
                    startIcon={submitIcon}
                    fullWidth={{ xs: true, sm: false }}
                  >
                    {submitLabel}
                  </Button>
                </Stack>
              )}
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

DynamicForm.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.node,
      type: PropTypes.string,
      grid: PropTypes.object,
      placeholder: PropTypes.string,
      required: PropTypes.bool,
      options: PropTypes.array,
      defaultValue: PropTypes.any,
    }),
  ).isRequired,
  initialValues: PropTypes.object,
  validationSchema: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func,
  submitLabel: PropTypes.string,
  submitIcon: PropTypes.node,
  cancelLabel: PropTypes.string,
  onCancel: PropTypes.func,
  showReset: PropTypes.bool,
  resetLabel: PropTypes.string,
  loading: PropTypes.bool,
  errorAlert: PropTypes.string,
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  actions: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default DynamicForm;
