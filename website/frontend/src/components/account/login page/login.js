import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from "react-alert";
import { useStyleLogin } from './loginStyle';
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar, Container, CssBaseline, Typography,
  TextField, Button, Grid, Link,
} from '@material-ui/core';
import { login, clearErrors } from '../../../actions/userAction';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../../layout/loader page/loader';
import MetaData from '../../layout/metadata/metadata';

export default function Login() {
  const classes = useStyleLogin();

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    dispatch(login(formData));
  };
  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, navigate, isAuthenticated, redirect]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Login Page" />

          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>

              <Typography component="h1" variant="h5">
                Sign in
              </Typography>

              <form className={classes.form} onSubmit={handleSubmit} >
                <TextField
                  variant="outlined" margin="normal" fullWidth required label="Email Address" name="email"
                  value={email} onChange={(e) => setEmail(e.target.value)} className={classes.textfield4}
                />
                <TextField
                  variant="outlined" margin="normal" required fullWidth label="Password" name="password" type="password"
                  value={password} onChange={(e) => setPassword(e.target.value)} className={classes.textfield4}
                />

                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/password/forgot" variant="body2"> Forgot password? </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/registration" variant="body2"> {"Don't have an account? Sign Up"} </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};