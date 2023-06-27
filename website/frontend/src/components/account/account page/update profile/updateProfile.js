import React, { Fragment, useState, useEffect } from 'react';
import { useStyleUpdateProfile } from './updateProfileStyle';
import ProfileSidebar from '../sidebar/profileSidebar';
import { useDispatch, useSelector } from "react-redux";
import Loader from '../../../layout/loader page/loader';
import { updateProfile, loadUser, clearErrors } from '../../../../actions/userAction';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { UPDATE_PROFILE_RESET } from '../../../../constants/userConstants';
import { Avatar, Container, Typography, Grid, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MetaData from '../../../layout/metadata/metadata';

export default function UpdateProfile() {
    const classes = useStyleUpdateProfile();
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
    const id = user.user._id;

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('image', image);

        dispatch(updateProfile(formData, id));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            setFirstName(user.user.firstName);
            setLastName(user.user.lastName);
            setEmail(user.user.email);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());

            navigate("/account");
            dispatch({ type: UPDATE_PROFILE_RESET, });
        }
    }, [dispatch, error, alert, navigate, user, isUpdated]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Update Profile" />

                    <div className={classes.root}>
                        <ProfileSidebar />
                        <div className={classes.content}>
                            <Container>
                                <Avatar className={classes.avatar}> <LockOutlinedIcon /> </Avatar>
                                <Typography component="h3" variant="h5" className={classes.typography1}>
                                    Update Profile
                                </Typography>

                                <form className={classes.form} encType="multipart/form-data" onSubmit={updateProfileSubmit}>
                                    <Grid container spacing={2} style={{ marginLeft: '150px' }}>
                                        <Grid item xs={12} >
                                            <Typography component="h5" variant="h7">
                                                First Name
                                            </Typography>
                                            <TextField variant="outlined" margin="normal" fullWidth className={classes.textfield4} required
                                                name="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Typography component="h5" variant="h7">
                                                Last Name
                                            </Typography>
                                            <TextField variant="outlined" margin="normal" fullWidth className={classes.textfield4} required
                                                name="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Typography component="h5" variant="h7">
                                                Email
                                            </Typography>
                                            <TextField variant="outlined" margin="normal" fullWidth className={classes.textfield4} required
                                                name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Typography component="h5" variant="h7">
                                                File
                                            </Typography>
                                            <TextField variant="outlined" margin="normal" fullWidth required name="image" type="file"
                                                InputProps={{ className: classes.fileInput, onChange: handleImageChange, accept: 'image/*' }} />
                                        </Grid>
                                        <Button type="submit" variant="contained" color="primary" className={classes.button} style={{ marginLeft: '50px' }} >
                                            Update Profile
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