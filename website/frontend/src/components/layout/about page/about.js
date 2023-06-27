import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, Card, CardContent, CardMedia, IconButton } from '@material-ui/core';
import { Facebook as FacebookIcon, Twitter as TwitterIcon, Instagram as InstagramIcon } from '@material-ui/icons';
import MetaData from '../metadata/metadata';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  card: {
    margin: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: theme.spacing(2),
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardMedia: {
    height: 200,
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  teamContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: theme.spacing(2, 0),
  },
  contactContainer: {
    margin: theme.spacing(4, 0),
  },
  socialMedia: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
}));

const About = () => {
  const classes = useStyles();

  const teamMembers = [
    {
      name: 'John Doe',
      destination: 'CEO',
      photoUrl: 'https://source.unsplash.com/random',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget risus nec nisi tempor ornare. In eu imperdiet nunc.',
    },
    {
      name: 'Jane Smith',
      destination: 'Marketing Manager',
      photoUrl: 'https://source.unsplash.com/random',
      description: 'Sed a consectetur libero. Quisque eget dui sed libero tincidunt auctor. Morbi at nibh mauris. Nam pretium ullamcorper est.',
    },
    {
      name: 'Alex Johnson',
      destination: 'Lead Developer',
      photoUrl: 'https://source.unsplash.com/random',
      description: 'Vestibulum ultricies fringilla nisl sit amet tempor. Aenean semper neque sit amet pretium commodo.',
    },
  ];

  return (
    <Fragment>
      <MetaData title="About Page" />

      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h4" component="h1" align="center" className={classes.title}>
          About Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" component="h2" align="center"> Our Mission </Typography>
                <Typography variant="body1" align="center"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget risus nec nisi tempor ornare. In eu imperdiet nunc. </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" component="h2" align="center"> Our Vision </Typography>
                <Typography variant="body1" align="center"> Sed a consectetur libero. Quisque eget dui sed libero tincidunt auctor. Morbi at nibh mauris. Nam pretium ullamcorper est. </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Typography variant="h5" component="h2" align="center" className={classes.title}> Our Team </Typography>
        <div className={classes.teamContainer}>
          {teamMembers.map((member, index) => (
            <Card className={classes.card} key={index}>
              <CardContent className={classes.cardContent}>
                <div className={classes.imageContainer}>
                  <CardMedia component="img" alt={member.name} image={member.photoUrl} title={member.name} className={classes.cardMedia} />
                </div>
                <div className={classes.textContainer}>
                  <Typography variant="h6" component="h3" align="center" style={{ paddingBottom: '30px' }}> {member.name} </Typography>
                  <Typography variant="body2" align="center" style={{ paddingBottom: '10px' }}> {member.destination} </Typography>
                  <Typography variant="body1" align="center" style={{ paddingBottom: '60px' }}> {member.description} </Typography>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Typography variant="h5" component="h2" align="center" className={classes.title}> Contact Information </Typography>
        <div className={classes.contactContainer}>
          <Typography variant="body1" align="center"> Address: 123 Main Street, City </Typography>
          <Typography variant="body1" align="center"> Phone: 123-456-7890 </Typography>
          <Typography variant="body1" align="center"> Email: contact@example.com </Typography>
        </div>
        <div className={classes.socialMedia}>
          <IconButton> <FacebookIcon /> </IconButton>
          <IconButton> <TwitterIcon /> </IconButton>
          <IconButton> <InstagramIcon /> </IconButton>
        </div>
      </Container>
    </Fragment>
  );
};

export default About;