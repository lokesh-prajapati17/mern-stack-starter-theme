import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import { Box, FormHelperText } from "@mui/material";
import { SwitchInput } from "../../common/SwitchInput";

/**
 * Formik-connected SwitchInput adapter
 */
export const FormikSwitchInput = ({ name, helperText, onChange, sx, ...props }) => {
  const [field, meta] = useField({ name, type: "checkbox" });
  const isError = Boolean(meta.touched && meta.error);

  const handleChange = (e) => {
    field.onChange(e);
    if (onChange) onChange(e);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", ...sx }}>
      <SwitchInput
        {...field}
        {...props}
        id={name}
        name={name}
        checked={Boolean(field.value)}
        onChange={handleChange}
        onBlur={field.onBlur}
      />
      {(isError || helperText) && (
        <FormHelperText error={isError} sx={{ ml: 1, mt: 0.25 }}>
          {isError ? meta.error : helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

FormikSwitchInput.propTypes = {
  name: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  onChange: PropTypes.func,
  sx: PropTypes.object,
};

export default FormikSwitchInput;
