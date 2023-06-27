import React, { Fragment, useState, useEffect } from 'react';
import { useStyleUpdatePassword } from './updatePasswordStyle';
import ProfileSidebar from '../sidebar/profileSidebar';
import { useDispatch, useSelector } from "react-redux";
import Loader from '../../../layout/loader page/loader';
import { updatePassword, clearErrors } from '../../../../actions/userAction';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { UPDATE_PASSWORD_RESET } from '../../../../constants/userConstants';
import { Avatar, Container, Typography, Grid, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MetaData from '../../../layout/metadata/metadata';

export default function UpdatePassword() {
    const classes = useStyleUpdatePassword();
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);
    const { user } = useSelector((state) => state.user);
    const id = user.user._id;

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const formData = { oldPassword, newPassword, confirmPassword, };

        dispatch(updatePassword(formData, id));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            navigate("/account");
            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, error, alert, navigate, isUpdated]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Update Password" />

                    <div className={classes.root}>
                        <ProfileSidebar />
                        <div className={classes.content}>
                            <Container>
                                <Avatar className={classes.avatar}> <LockOutlinedIcon /> </Avatar>
                                <Typography component="h3" variant="h5" className={classes.typography1}>
                                    Update Password
                                </Typography>

                                <Typography component="h6" variant="h7" className={classes.typography2}>
                                    Your new password must be different to previously used passwords
                                </Typography>

                                <form className={classes.form} onSubmit={updatePasswordSubmit}>
                                    <Grid container spacing={2}  style={{ marginLeft: '150px' }}>
                                        <Grid item xs={12} >
                                            <Typography component="h5" variant="h7">
                                                Old Password*
                                            </Typography>
                                            <TextField variant="outlined" margin="normal" fullWidth className={classes.textfield4} required
                                               name="oldPassword" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography component="h5" variant="h7">
                                                New Password*
                                            </Typography>
                                            <TextField variant="outlined" margin="normal" fullWidth className={classes.textfield4} required 
                                                name="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography component="h5" variant="h7">
                                                Confirm Password*
                                            </Typography>
                                            <TextField variant="outlined" margin="normal" fullWidth className={classes.textfield4} required
                                                name="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                        </Grid>
                                        <Button type="submit" variant="contained" color="primary" className={classes.button} style={{ marginLeft: '50px' }} >
                                            Update password
                                        </Button>
                                    </Grid>
                                </form>
                            </Container>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};