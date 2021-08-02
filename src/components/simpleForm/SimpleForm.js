
import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import { Grid, Button } from '@material-ui/core'
import FormikTextField from '../common/FormikTextField'
import {getUser} from '../../services/backend'

const initialValues = {
  name: '',
  username: '',
  email: '',
  address : {
    street: '',
    city: '',
    zipcode: ''
  }
}

const SimpleForm = ({userId}) => {

  const [userInfo, setUserInfo] = useState({ ...initialValues, address: { ...initialValues.address } })

  useEffect(()=>{
    console.log(userInfo)
  })

  useEffect(()=> {
    getUser(userId)
    .then((res) => {
      console.log(res)
      const newUserInfo = {...initialValues, address: { ...initialValues.address }};
      newUserInfo.name = res.name;
      newUserInfo.username = res.username;
      newUserInfo.email = res.email;
      newUserInfo.address.street = res.address.street;
      newUserInfo.address.city = res.address.city;
      newUserInfo.address.zipcode = res.address.zipcode;

      setUserInfo(newUserInfo)
    }).catch((err) => { console.log(err)})
  },[userId])

  const submitHanlder = () => {
    console.log("submit called")
  }

  return (
    <React.Fragment>
    <h2>User Information</h2>
    <Formik 
      initialValues={userInfo}
      enableReinitialize
      onSubmit={submitHanlder}
    >
      {({values, errors, touched }) => {
        return (<Form>
          <Grid container spacing={2}>
            <Grid item sm={12} md={12} lg={12}>
              <FormikTextField variant="outlined" name="name" type="text" size="small" label="Name" ></FormikTextField>
            </Grid> 
            <Grid item sm={12} md={12} lg={12}>
              <FormikTextField variant="outlined" name="username" type="text" size="small" label="User Name" ></FormikTextField>
            </Grid> 
            <Grid item sm={12} md={12} lg={12}>
              <FormikTextField variant="outlined" name="email" type="text" size="small" label="Email" ></FormikTextField>
            </Grid> 
            <Grid item sm={12} md={12} lg={12}>
              <FormikTextField variant="outlined" name="address.street" type="email" size="small" label="Street" ></FormikTextField>
            </Grid> 
            <Grid item sm={12} md={12} lg={12}>
              <FormikTextField variant="outlined" name="address.city" type="text" size="small" label="City" ></FormikTextField>
            </Grid> 
            <Grid item sm={12} md={12} lg={12}>
              <FormikTextField variant="outlined" name="address.zipcode" type="text" size="small" label="Zip code" ></FormikTextField>
            </Grid>  
            <Grid item sm={12} md={12} lg={12}>
            <Button type="submit" size="smallpwd" label="Save">Save</Button>
            </Grid>
          </Grid>
        </Form>)
      }}
    </Formik>
    </React.Fragment>
  )
}

export default SimpleForm;