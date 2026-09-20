import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import { Box, FormHelperText } from "@mui/material";
import { CheckboxInput } from "../../common/CheckboxInput";

/**
 * Formik-connected CheckboxInput adapter
 */
export const FormikCheckboxInput = ({ name, helperText, onChange, sx, ...props }) => {
  const [field, meta] = useField({ name, type: "checkbox" });
  const isError = Boolean(meta.touched && meta.error);

  const handleChange = (e) => {
    field.onChange(e);
    if (onChange) onChange(e);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", ...sx }}>
      <CheckboxInput
        {...field}
        {...props}
        id={name}
        name={name}
        checked={Boolean(field.value)}
        onChange={handleChange}
        onBlur={field.onBlur}
      />
      {(isError || helperText) && (
        <FormHelperText error={isError} sx={{ ml: 3.5, mt: -0.5 }}>
          {isError ? meta.error : helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

FormikCheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  onChange: PropTypes.func,
  sx: PropTypes.object,
};

export default FormikCheckboxInput;
