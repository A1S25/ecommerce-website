import React from 'react';
import { Typography, Grid, Avatar, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const useStyles = makeStyles((theme) => ({
    root: { marginBottom: theme.spacing(3) },
    heading: { marginBottom: theme.spacing(2) },
    averageRating: { marginBottom: theme.spacing(2) },
    userReview: { marginBottom: theme.spacing(2) },
    userReviewItem: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
    },
    userAvatar: { marginRight: theme.spacing(2) },
    chartContainer: { marginTop: theme.spacing(4) },
}));

const CustomerReview = ({ review, reviewsLength, ratingdata }) => {
    const classes = useStyles();
    const name = `${review.firstName} ${review.lastName}`;
    const length = reviewsLength;

    const data = [];
    ratingdata.map((item) => {
        const count = item.counts;
        const rating = item.rating;
        const combine = count * rating;
        data.push({ combined: combine, counting: count });
    });

    const combinedSum = data.reduce((acc, item) => acc + item.combined, 0);
    const countingSum = data.reduce((acc, item) => acc + item.counting, 0);
    const averageRating = combinedSum / countingSum;


    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="h4" className={classes.heading}> Customer Reviews </Typography>
                    <Typography variant="h6" className={classes.averageRating}>
                        Average Rating: {averageRating.toFixed(1)}
                    </Typography>
                    <Typography variant="subtitle1"> Total Ratings: {length} </Typography>

                    <Box display="flex" alignItems="center" className={classes.userReview}>
                        <Rating value={averageRating} precision={0.5} readOnly />
                        <Typography variant="body2" color="textSecondary"> ({length} reviews) </Typography>
                    </Box>
                    <BarChart width={400} height={300} data={ratingdata}>
                        <CartesianGrid strokeDasharray="3 3" /> <XAxis dataKey="rating" />
                        <YAxis /> <Tooltip /> <Legend /> <Bar dataKey="counts" fill="#8884d8" />
                    </BarChart>
                </Grid>

                <Grid item xs={6} className={classes.chartContainer}>
                    <div key={review._id} className={classes.userReviewItem}>
                        <Avatar src={"https://source.unsplash.com/random"}
                            alt={review.name} className={classes.userAvatar} />
                        <div>
                            <Typography variant="subtitle1">{name}</Typography>
                            <Rating value={review.rating} precision={0.5} readOnly />
                            <Typography variant="body2" color="textSecondary"> {review.comment} </Typography>
                            <Typography variant="body2" color="textSecondary"> Rating: {review.rating} </Typography>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default CustomerReview;