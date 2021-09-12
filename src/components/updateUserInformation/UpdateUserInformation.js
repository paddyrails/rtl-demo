import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Grid, Button } from "@material-ui/core";
import FormikTextField from "../common/FormikTextField";
import { getUser, saveUser } from "../../services/backend";

const initialValues = {
  id: "",
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    city: "",
    zipcode: "",
  },
};

const UpdateUserInformation = ({ userId }) => {
  const [userInfo, setUserInfo] = useState({
    ...initialValues,
    address: { ...initialValues.address },
  });
  const [error, setError] = useState(undefined);

  useEffect(() => {
    getUser(userId)
      .then((res) => {
        const newUserInfo = {
          ...initialValues,
          address: { ...initialValues.address },
        };
        newUserInfo.id = res.id;
        newUserInfo.name = res.name;
        newUserInfo.username = res.username;
        newUserInfo.email = res.email;
        newUserInfo.address.street = res.address.street;
        newUserInfo.address.city = res.address.city;
        newUserInfo.address.zipcode = res.address.zipcode;

        setUserInfo(newUserInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const submitHanlder = (data) => {
    saveUser({
      id: userInfo.id,
      name: data.name,
      username: data.username,
      email: data.email,
      street: data.address.street,
      city: data.address.city,
      zipcode: data.address.zipcode,
    })
      .then((res) => {})
      .catch((err) => setError(err));
  };

  return (
    <React.Fragment>
      <h2>Update User Information</h2>

      <p>{error ? error : null}</p>

      <Formik
        initialValues={userInfo}
        enableReinitialize
        onSubmit={submitHanlder}
      >
        {({ values, errors, touched }) => {
          return (
            <Form>
              <Grid container spacing={2}>
                <Grid item sm={12} md={12} lg={12}>
                  <FormikTextField
                    variant="outlined"
                    name="name"
                    type="text"
                    size="small"
                    labeltext="Name"
                  />
                </Grid>
                <Grid item sm={12} md={12} lg={12}>
                  <FormikTextField
                    variant="outlined"
                    name="username"
                    type="text"
                    size="small"
                    labeltext="User Name"
                  />
                </Grid>
                <Grid item sm={12} md={12} lg={12}>
                  <FormikTextField
                    variant="outlined"
                    name="email"
                    type="email"
                    size="small"
                    labeltext="Email"
                  />
                </Grid>
                <Grid item sm={12} md={12} lg={12}>
                  <FormikTextField
                    variant="outlined"
                    name="address.street"
                    type="text"
                    size="small"
                    labeltext="Street"
                  />
                </Grid>
                <Grid item sm={12} md={12} lg={12}>
                  <FormikTextField
                    variant="outlined"
                    name="address.city"
                    type="text"
                    size="small"
                    labeltext="City"
                  />
                </Grid>
                <Grid item sm={12} md={12} lg={12}>
                  <FormikTextField
                    variant="outlined"
                    name="address.zipcode"
                    type="text"
                    size="small"
                    labeltext="Zip code"
                  />
                </Grid>
                <Grid item sm={12} md={12} lg={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    label="Save"
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default UpdateUserInformation;
