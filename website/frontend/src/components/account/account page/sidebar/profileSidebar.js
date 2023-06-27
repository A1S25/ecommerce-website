import React from 'react';
import { useStyleProfileSidebar } from './profileSidebarStyle';
import { Typography, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from '../../../../actions/userAction';
import { useAlert } from 'react-alert';

export default function ProfileSidebar() {
    const classes = useStyleProfileSidebar();
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        alert.success("Logout Successfully");
        navigate("/homes");
      };

    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebarContent}>
                <Typography variant="h6">Account Navigation</Typography>
                <List component="nav">
                    <ListItem button component={Link} to="/orders">
                        <ListItemText primary="My Order" />
                    </ListItem>
                    <ListItem button component={Link} to="/me/update">
                        <ListItemText primary="Update Profile" />
                    </ListItem>
                    <ListItem button component={Link} to="/password/update">
                        <ListItemText primary="Update Password" />
                    </ListItem>
                </List>
                <Divider />
                <Typography variant="body2" className={classes.contactInformation}>
                    Customer Support
                </Typography>
                <Typography variant="body2" className={classes.contactInformation} onClick={handleLogout}>
                    Logout
                </Typography>
            </div>
        </div>
    );
};