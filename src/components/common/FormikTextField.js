import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';

const FormikTextField = ({placeholder, ...props}) => {
  const [field, meta] = useField(props)
  return (
    <TextField
      {...field}
      placeholder={placeholder}
      {...props}
    />
  )
}

export default FormikTextField