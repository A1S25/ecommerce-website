import React, { Fragment, useEffect, useState } from 'react';
import { useStyleRegistration } from './registrationStyle';
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar, Container, CssBaseline, Typography, InputAdornment,
  TextField, Grid, Button
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { AccountCircle } from '@material-ui/icons';
import { register, clearErrors } from '../../../actions/userAction';
import { useAlert } from "react-alert";
import Loader from '../../layout/loader page/loader';
import MetaData from '../../layout/metadata/metadata';

export default function Registration() {
  const classes = useStyleRegistration();

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, } = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('password', password);
    formData.append('image', image);

    dispatch(register(formData));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // useEffect
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Registration Page" />

          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>

              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>

              <Typography component="h6" variant="h7" >
                Enter Your details to create your Apex Markets account:
              </Typography>

              <form className={classes.form} encType="multipart/form-data" onSubmit={handleSubmit}>

                <Grid container spacing={2}>

                  <Grid item xs={12} sm={6}>
                    <Typography component="h5" variant="h7">
                      First Name*
                    </Typography>
                    <TextField variant="outlined" required fullWidth className={classes.textfield1}
                      margin="normal" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography component="h5" variant="h7">
                      Last Name*
                    </Typography>
                    <TextField variant="outlined" required fullWidth className={classes.textfield1}
                      margin="normal" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </Grid>


                  <Grid item xs={12}>
                    <Typography component="h5" variant="h7">
                      Email*
                    </Typography>
                    <TextField variant="outlined" margin="normal" fullWidth className={classes.textfield4}
                      required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Grid>

                  <Typography component="h5" variant="h7"> Phone Number* </Typography>

                  <Grid container>
                    <Grid item xs={12} sm={4}>
                      <TextField variant="outlined" fullwidth className={classes.textfield2} InputProps={{
                        startAdornment: (<InputAdornment position="start"> <AccountCircle /> </InputAdornment>),
                      }} select label="Select" margin="normal" style={{ marginLeft: '5px' }} name="phoneCode" />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField variant="outlined" required fullWidth className={classes.textfield3}
                        margin="normal" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </Grid>
                  </Grid>


                  <Grid item xs={12} sm={6} >
                    <Typography component="h5" variant="h7" style={{ marginRight: '20px' }}>
                      Password*
                    </Typography>
                    <TextField variant="outlined" required fullWidth className={classes.textfield1}
                      margin="normal" style={{ marginRight: '15px' }} name="password" type="password"
                      value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography component="h5" variant="h7">
                      Confirm Password*
                    </Typography>
                    <TextField variant="outlined" required fullWidth className={classes.textfield1}
                      margin="normal" name="confirmPassword" type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography component="h5" variant="h7"> Avatar </Typography>
                    <input type="file" accept="image/*" onChange={handleImageChange} name="image" />
                  </Grid>

                  <Button type="submit" fullWidth variant="contained" color="grey" className={classes.button} style={{
                    marginTop: '8px', borderRadius: '20px',
                    '&:hover': { backgroundColor: 'yellow', },
                  }} >
                    Sign In
                  </Button>

                </Grid>
              </form>
            </div>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};