import React, { Fragment, useEffect, useState } from 'react';
import { useStyleUpdateUser } from './updateuserStyle';
import { useAlert } from "react-alert";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../../../layout/loader page/loader';
import { getUserDetails, updateUser, clearErrors } from '../../../../actions/userAction';
import { UPDATE_USER_RESET } from '../../../../constants/userConstants';
import { Button, TextField, Typography, Select, MenuItem,
    FormControl, InputLabel, Avatar, Container, Grid } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MetaData from '../../../layout/metadata/metadata';

export default function UpdateUser() {
    const classes = useStyleUpdateUser();
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { loading: updateLoading, error: updateError, isUpdated, } = useSelector((state) => state.profile);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const { id } = useParams();

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('role', role);

        dispatch(updateUser(id, formData));
    };

    useEffect(() => {
        if (user && user._id !== id) {
            dispatch(getUserDetails(id));
        } else {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setRole(user.role);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("User Updated Successfully");
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, alert, error, navigate, isUpdated, updateError, user, id]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Update User Page" />

                    <Container maxWidth="sm">
                    <div className={classes.container}>
                        <Avatar className={classes.avatar}> <LockOutlinedIcon /> </Avatar>
                        <Typography component="h3" variant="h5" className={classes.typography1}>
                            Update User
                        </Typography>
                        <form className={classes.form} onSubmit={updateUserSubmitHandler} >
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <Typography component="h5" variant="h7">
                                        First Name*
                                    </Typography>
                                    <TextField variant="outlined" margin="normal" fullWidth className={classes.textfield4} 
                                        required name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </Grid>
                                <Grid item xs={12} >
                                    <Typography component="h5" variant="h7">
                                        Last Name*
                                    </Typography>
                                    <TextField variant="outlined" margin="normal" fullWidth className={classes.textfield4} 
                                        required name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </Grid>
                                <Grid item xs={12} >
                                    <Typography component="h5" variant="h7">
                                        Email*
                                    </Typography>   
                                    <TextField variant="outlined" margin="normal" fullWidth className={classes.textfield4} 
                                        required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </Grid>
                            </Grid>
                            
                            <FormControl className={classes.formField}>
                                <InputLabel>Role</InputLabel>
                                <Select value={role} onChange={(e) => setRole(e.target.value)} required>
                                    <MenuItem value=""> <em>Choose Role</em> </MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="user">User</MenuItem>
                                </Select>
                            </FormControl>
                            <Button type="submit" variant="contained" color="primary" className={classes.button}
                                disabled={updateLoading ? true : false || role === "" ? true : false} style={{ marginLeft: '180px' }} >
                                Update
                            </Button>
                        </form>
                    </div>
                    </Container>
                </Fragment>
            )}
        </div>
    )
};