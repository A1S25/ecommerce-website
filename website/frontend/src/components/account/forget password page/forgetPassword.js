import React, { Fragment, useEffect, useState } from 'react';
import { useStyleForgetPassword } from './forgetPasswordStyle';
import { useSelector, useDispatch } from "react-redux";
import {
    Avatar, Container, CssBaseline, Typography,
    TextField, Button, Grid, Link,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { forgotPassword, clearErrors } from '../../../actions/userAction';
import Loader from '../../layout/loader page/loader';
import { useAlert } from "react-alert";
import MetaData from '../../layout/metadata/metadata';

export default function ForgetPassword() {
    const classes = useStyleForgetPassword();

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        dispatch(forgotPassword(formData));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message);
        }
    }, [dispatch, error, alert, message]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Forget Password Page" />
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>

                            <Typography component="h1" variant="h5">
                                Reset password
                            </Typography>

                            <div style={{ spacing: 2 }}>
                                <Typography component="h6" variant="h7">
                                    No worries we will send you reset instructions
                                </Typography>
                            </div>

                            <form className={classes.form} onSubmit={handleSubmit} >
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography component="h5" variant="h7">
                                            Email*
                                        </Typography>
                                        <TextField variant="outlined" margin="normal" fullWidth className={classes.textfield4} required
                                            value={email} onChange={(e) => setEmail(e.target.value)} label="Email Address" name="email" />
                                    </Grid>

                                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.button} >
                                        Reset password
                                    </Button>

                                    <Grid container>
                                        <Grid item xs style={{ margin: 15 }}>
                                            <Link href="/login" variant="body2"> {"<- Back to log in"} </Link>
                                        </Grid>
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