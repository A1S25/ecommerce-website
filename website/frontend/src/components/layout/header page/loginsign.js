import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Link, Grid } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '300px',
    padding: theme.spacing(2),
    backgroundColor: '#FFFFFF',
    borderRadius: theme.spacing(2),
    textAlign: 'center',
    margin: 0,
    position: 'relative',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
  },
  loginButton: {
    marginBottom: theme.spacing(2),
  },
  registrationLink: {
    marginBottom: theme.spacing(4),
    color: '#007bff',
    textDecoration: 'underline',
  },
  verticalLine: {
    position: 'absolute',
    top: 'calc(50% + 35px)',
    bottom: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderLeft: `1.5px solid ${theme.palette.divider}`,
    height: 'calc(100% - 155px)',
  },
  section: {
    padding: theme.spacing(2),
    whiteSpace: 'nowrap',
  },
  linkList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    marginLeft: '-10px',
  },
  listItem: {
    marginBottom: theme.spacing(1),
  },
  accountLink: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const Loginsign = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClickAccount = () => {
    navigate("/login?redirect=/account");
  };

  const handleClickSellerDashboard = () => {
    navigate("/login?redirect=/seller/dashboard");
  };

  const handleClickAdminDashboard = () => {
    navigate("/login?redirect=/admin/dashboard");
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Link href="/login">
          <Button variant="contained" color="primary" className={classes.loginButton} > Login </Button>
        </Link>
        <Typography variant="body1">
          New User?{' '}
          <Link href="/registration" className={classes.registrationLink}> Register here </Link>
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <div className={classes.section}>
              <Typography variant="h6">Your Lists</Typography>
              <ul className={classes.linkList}>
                <li className={classes.listItem}>
                  <Link href="#">Your wishlist</Link>
                </li>
                <li className={classes.listItem}>
                  <Link href="#">Explore Products</Link>
                </li>
                <li className={classes.listItem}>
                  <Link href="#">Discover Your Style</Link>
                </li>
                <li className={classes.listItem} onClick={handleClickAdminDashboard}>
                  <Typography variant="body2" className={classes.accountLink} component="span" >
                    Admin Account
                  </Typography>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.section}>
              <Typography variant="h6">Your Account</Typography>
              <ul className={classes.linkList}>
                <li className={classes.listItem} onClick={handleClickAccount}>
                  <Typography variant="body2" className={classes.accountLink} component="span" >
                    Your Account
                  </Typography>
                </li>
                <li className={classes.listItem} onClick={handleClickSellerDashboard}>
                  <Typography variant="body2" className={classes.accountLink} component="span" >
                    Your Seller Account
                  </Typography>
                </li>
                <li className={classes.listItem}>
                  <Link href="#">Your Order</Link>
                </li>
                <li className={classes.listItem}>
                  <Link href="#">Your Order History</Link>
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>
        <div className={classes.verticalLine}></div>
      </div>
    </div>
  );
};

export default Loginsign;