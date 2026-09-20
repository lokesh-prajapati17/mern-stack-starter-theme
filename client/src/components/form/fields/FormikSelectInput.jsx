import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import { SelectInput } from "../../common/SelectInput";

/**
 * Formik-connected SelectInput adapter
 */
export const FormikSelectInput = ({ name, helperText, onChange, ...props }) => {
  const [field, meta] = useField(name);
  const isError = Boolean(meta.touched && meta.error);

  const handleChange = (e) => {
    field.onChange(e);
    if (onChange) onChange(e);
  };

  return (
    <SelectInput
      {...field}
      {...props}
      id={name}
      name={name}
      value={field.value ?? ""}
      onChange={handleChange}
      onBlur={field.onBlur}
      error={isError}
      helperText={isError ? meta.error : helperText}
    />
  );
};

FormikSelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  onChange: PropTypes.func,
};

export default FormikSelectInput;
