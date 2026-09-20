import React from "react";
import PropTypes from "prop-types";
import { useField, useFormikContext } from "formik";
import { FileDropzone } from "../../common/FileDropzone";

/**
 * Formik-connected FileDropzone adapter
 */
export const FormikDropzone = ({ name, helperText, multiple = false, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const isError = Boolean(meta.touched && meta.error);

  const currentFiles = Array.isArray(field.value)
    ? field.value
    : field.value
      ? [field.value]
      : [];

  const handleDrop = (droppedFiles) => {
    setFieldTouched(name, true, false);
    if (multiple) {
      setFieldValue(name, [...currentFiles, ...droppedFiles]);
    } else {
      setFieldValue(name, droppedFiles[0] || null);
    }
  };

  const handleRemove = (index) => {
    if (multiple) {
      const updated = currentFiles.filter((_, i) => i !== index);
      setFieldValue(name, updated);
    } else {
      setFieldValue(name, null);
    }
  };

  return (
    <FileDropzone
      {...props}
      multiple={multiple}
      files={currentFiles}
      onDrop={handleDrop}
      onRemove={handleRemove}
      error={isError}
      helperText={isError ? meta.error : helperText}
    />
  );
};

FormikDropzone.propTypes = {
  name: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  multiple: PropTypes.bool,
};

export default FormikDropzone;
