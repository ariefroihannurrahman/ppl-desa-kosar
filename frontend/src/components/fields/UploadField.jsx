import React from 'react';
import { Field } from 'formik';

function UploadField({
  field,
  // eslint-disable-next-line no-unused-vars
  form: { touched, errors },
  name,
  label,
  isError,
  ...props
}) {
  return (
    <Field
      variant="outlined"
      name="uploader"
      title={label}
      type="file"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

export default UploadField;
