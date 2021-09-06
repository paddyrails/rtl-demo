import React from 'react';
import { useField } from 'formik';
import { TextField, FormControl } from '@material-ui/core';

const FormikTextField = ({placeholder, ...props}) => {
  const [field] = useField(props)
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