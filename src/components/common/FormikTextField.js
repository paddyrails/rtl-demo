import React from 'react';
import { useField } from 'formik';
import { TextField, FormControl, InputLabel } from '@material-ui/core';

const FormikTextField = ({placeholder, ...props}) => {
  const [field, meta] = useField(props)
  return (
    <FormControl size='small' variant="outlined">
      {/* <InputLabel htmlFor={props.name}>{props.labeltext}</InputLabel> */}
      <TextField
        {...field}
        id={props.name}
        label={props.labeltext}  
        placeholder={placeholder}
        {...props}
      />
    </FormControl>
    
  )
}

export default FormikTextField  