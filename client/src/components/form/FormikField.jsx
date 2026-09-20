import React from "react";
import PropTypes from "prop-types";
import {
  FormikTextInput,
  FormikSelectInput,
  FormikCheckboxInput,
  FormikSwitchInput,
  FormikDropzone,
} from "./fields";

/**
 * Universal FormikField Dispatcher
 * Automatically renders the correct form control based on `type`.
 */
export const FormikField = ({
  type = "text",
  name,
  label,
  options = [],
  render,
  ...props
}) => {
  if (render) {
    return render({ name, label, options, ...props });
  }

  switch (type) {
    case "select":
      return <FormikSelectInput name={name} label={label} options={options} {...props} />;

    case "checkbox":
      return <FormikCheckboxInput name={name} label={label} {...props} />;

    case "switch":
      return <FormikSwitchInput name={name} label={label} {...props} />;

    case "file":
    case "dropzone":
      return <FormikDropzone name={name} label={label} {...props} />;

    case "textarea":
    case "multiline":
      return (
        <FormikTextInput
          name={name}
          label={label}
          multiline
          rows={props.rows || 3}
          {...props}
        />
      );

    case "text":
    case "email":
    case "password":
    case "number":
    default:
      return <FormikTextInput name={name} label={label} type={type} {...props} />;
  }
};

FormikField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  options: PropTypes.array,
  render: PropTypes.func,
  rows: PropTypes.number,
};

export default FormikField;
