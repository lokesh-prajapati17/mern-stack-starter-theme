import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import { TextInput } from "../../common/TextInput";

/**
 * Formik-connected TextInput adapter
 */
export const FormikTextInput = ({ name, helperText, onChange, onBlur, ...props }) => {
  const [field, meta] = useField(name);
  const isError = Boolean(meta.touched && meta.error);

  const handleChange = (e) => {
    field.onChange(e);
    if (onChange) onChange(e);
  };

  const handleBlur = (e) => {
    field.onBlur(e);
    if (onBlur) onBlur(e);
  };

  return (
    <TextInput
      {...field}
      {...props}
      id={name}
      name={name}
      value={field.value ?? ""}
      onChange={handleChange}
      onBlur={handleBlur}
      error={isError}
      helperText={isError ? meta.error : helperText}
    />
  );
};

FormikTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default FormikTextInput;
