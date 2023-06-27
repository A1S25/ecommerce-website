import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Grid, TextField, Button, IconButton, Paper } from '@material-ui/core';
import { Email, Phone, Room, Facebook, Twitter, Instagram } from '@material-ui/icons';
import MetaData from '../metadata/metadata';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', // Use minHeight instead of height
    padding: theme.spacing(4), // Add padding for spacing
  },
  contactInfo: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  contactForm: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: '#ffffff',
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
  socialMedia: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Contact = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <MetaData title="Contact Page" />

      <div className={classes.container}>
        <Container maxWidth="md"> {/* Use maxWidth to limit the container width */}
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Paper className={classes.contactInfo}>
                <Typography variant="h5">Contact Information</Typography>
                <Room />
                <Typography>123 Main Street, City</Typography>
                <Phone />
                <Typography>123-456-7890</Typography>
                <Email />
                <Typography>contact@example.com</Typography>
              </Paper>
            </Grid>

            <div className={classes.socialMedia}>
              <IconButton> <Facebook /> </IconButton>
              <IconButton> <Twitter /> </IconButton>
              <IconButton> <Instagram /> </IconButton>
            </div>

            <Grid item>
              <Paper className={classes.contactForm}>
                <Typography variant="h5">Contact Us</Typography>
                <TextField label="Name" variant="outlined" fullWidth className={classes.formField} />
                <TextField label="Email" variant="outlined" fullWidth className={classes.formField} />
                <TextField label="Subject" variant="outlined" fullWidth className={classes.formField} />
                <TextField label="Message" variant="outlined" multiline rows={4} fullWidth className={classes.formField} />
                <Button variant="contained" color="primary">Send</Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Fragment>
  );
};

export default Contact;