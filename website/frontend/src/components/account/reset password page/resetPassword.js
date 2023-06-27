import React, { Fragment, useEffect, useState } from 'react';
import { useStyleResetPassword } from './resetPasswordStyle';
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Container, CssBaseline, Typography, TextField, Button, Grid, Link, } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { resetPassword, clearErrors } from '../../../actions/userAction';
import { useAlert } from "react-alert";
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../../layout/loader page/loader';
import MetaData from '../../layout/metadata/metadata';

export default function ResetPassword() {
    const classes = useStyleResetPassword();

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, success, loading, } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { token } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);

        try {
            dispatch(resetPassword(token, formData));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password Updated Successfully");

            navigate("/login");
        }
    }, [dispatch, error, success, alert, navigate]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Reset Password" />
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>

                            <Typography component="h1" variant="h5">
                                Set new password
                            </Typography>

                            <Typography component="h6" variant="h7">
                                Your new password must be different to previously used passwords
                            </Typography>

                            <form className={classes.form} onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography component="h5" variant="h7">
                                            Password
                                        </Typography>
                                        <TextField variant="outlined" margin="normal" fullWidth className={classes.textfield4} required
                                            style={{ marginRight: '15px' }} name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography component="h5" variant="h7">
                                            Confirm Password
                                        </Typography>
                                        <TextField variant="outlined" margin="normal" fullWidth className={classes.textfield4} required
                                            name="confirmPassword" type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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