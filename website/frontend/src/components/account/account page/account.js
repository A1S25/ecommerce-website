import React, { Fragment } from 'react';
import { useStyleAccount } from './accountStyle';
import { Container, Typography, Box, Avatar, Grid } from '@material-ui/core';
import ProfileSidebar from './sidebar/profileSidebar';
import { useSelector } from "react-redux";
import MetaData from '../../layout/metadata/metadata';

export default function Account() {
    const classes = useStyleAccount();

    const { user } = useSelector((state) => state.user);
    const name = user.user.firstName + " " + user.user.lastName;
    const date = user.user.createdAt.substring(0, 10);
    const url = user.user.image[0]?.url || "https://source.unsplash.com/random";

    return (
        <Fragment>
            <MetaData title="Account Page" />

            <div className={classes.root}>
                <ProfileSidebar />

                <div className={classes.content}>
                    <Container>
                        <Typography variant="h6">Account Overview</Typography>
                        <Box className={classes.userInfoContainer} >
                            <Avatar className={classes.avatar} alt="Profile Picture" src={url} />
                            <Grid container spacing={2} className={classes.userInfo}>
                                <Grid item xs={6} style={{ paddingLeft: '100px' }}>
                                    <Typography variant="subtitle1">Name: {name}</Typography>
                                </Grid>
                                <Grid item xs={6} style={{ paddingLeft: '120px' }}>
                                    <Typography variant="subtitle1">Email: {user.user.email}</Typography>
                                </Grid>
                                <Grid item xs={6} style={{ paddingLeft: '100px' }}>
                                    <Typography variant="subtitle1">Phone Number: {user.user.phoneNumber}</Typography>
                                </Grid>
                                <Grid item xs={6} style={{ paddingLeft: '120px' }}>
                                    <Typography variant="subtitle1">Role: {user.user.role}</Typography>
                                </Grid>
                                <Grid item xs={12} style={{ paddingLeft: '100px' }}>
                                    <Typography variant="subtitle1">Date of Joining: {date}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </div>
            </div>
        </Fragment>
    );
};