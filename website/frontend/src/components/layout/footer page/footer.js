import React from 'react';
import { useStyleFooter } from './footerStyle';
import { Container, Grid, Typography, Link, IconButton, Toolbar, AppBar, } from '@material-ui/core';
import { Payment, ShoppingCart } from '@material-ui/icons';
import logo from '../../../images/logo.jpeg';

const Footer = () => {
  const classes = useStyleFooter();

  return (
    <AppBar position="static" className={classes.footer}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Grid container alignItems="flex-start" style={{ marginLeft: '-15px' }}>
            <Grid item xs={12} sm={4} style={{ marginLeft: '-25px' }}>
              <Grid container direction="column" justify="center">
                <Typography variant="subtitle1" className={classes.brandName}> 
                  <img src={logo} alt="Logo" style={{ width: '150px', height: '90px' }} className={classes.logoImage} /> 
                </Typography>
                <Typography variant="body2" className={classes.aboutBrand}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod nunc non rhoncus efficitur.
                </Typography>
                <Typography variant="subtitle2" className={classes.paymentIcons}>
                  Payment Methods:
                </Typography>
                <Grid container justify="center" className={classes.paymentIcons}>
                  <Payment className={classes.paymentIcon} />
                  <Payment className={classes.paymentIcon} />
                  <Payment className={classes.paymentIcon} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Typography variant="subtitle2" className={classes.shopMenu}> Shop </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> All Products </Link>
              </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> Laptop </Link>
              </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> Footbear </Link>
              </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> Bottom </Link>
              </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> Tops </Link>
              </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> Attire </Link>
              </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> Camera </Link>
              </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> SmartPhones </Link>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Typography variant="subtitle2" className={classes.companyLinks}> Company </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> About </Link>
              </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> Contact </Link>
              </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> News & Blog </Link>
              </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> Ideas & Guides </Link>
              </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> Careers </Link>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Typography variant="subtitle2" className={classes.serviceLinks}> Service </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> Shopping & Delivery </Link>
              </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> Gift Card </Link>
              </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> Order Pickup </Link>
              </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> Account Signup </Link>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Typography variant="subtitle2" className={classes.supportLinks}> Support </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> FAQs </Link>
              </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> Cookie Policy </Link>
              </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> Terms of Use </Link>
              </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> Returns </Link>
              </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> Track Orders </Link>
              </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> Feedback </Link>
              </Typography>
              <Typography variant="body2">
                <Link href="#" className={classes.link}> Security & Fraud </Link>
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
