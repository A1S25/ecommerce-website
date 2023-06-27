import React, { useState, Fragment, useEffect } from 'react';
import { Typography, Grid, Paper, TextField, Button } from '@material-ui/core';
import { useStyleOrderHistory } from "./orderHistoryStyle";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from '../../layout/loader page/loader';
import { getOrderDetails, clearErrors } from '../../../actions/orderAction';
import { newReview } from '../../../actions/productAction';
import Rating from '@material-ui/lab/Rating';
import { NEW_REVIEW_RESET } from '../../../constants/productConstants';
import MetaData from '../../layout/metadata/metadata';

export default function OrderHistory() {
    const classes = useStyleOrderHistory();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const { user } = useSelector((state) => state.user);
    const { order, error, loading } = useSelector((state) => state.orderDetails);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    const createdAt = order && order.createdAt;
    const date = createdAt && createdAt.substring(0, 10);

    const { id } = useParams();

    const handleFormSubmit = (e) => {
        e.preventDefault();
      
        let productId;
      
        if (order && order.orderItems && order.orderItems.length > 0) {
          order.orderItems.forEach((item) => {
            productId = item.product;
          });
        }
      
        if (user && user.user) {
          const { _id, firstName, lastName } = user.user;
          const id = user.user._id;
          console.log("id : "+id);
      
          const formData = {rating,comment,productId,id,firstName,lastName};
          dispatch(newReview(formData));    
      
          setFormSubmitted(true);
        }
    }; 

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id, success]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Order Detail Page" />
            
                    <div className={classes.root}>
                        <Typography variant="h4" gutterBottom> Order Detail </Typography>
                        <Typography variant="body1" style={{ marginBottom: '10px' }}> Order Date: {date} </Typography>
                        <Paper elevation={1} className={classes.orderId}>
                            <Typography variant="body1">Order ID: {order && order._id}</Typography>
                        </Paper>
                        {order?.orderItems?.map((item) => (
                            <Paper elevation={0} key={item.product} className={classes.productContainer}>
                                <Grid container spacing={1}>
                                    <Grid item xs={2}> <img src={item.image} alt={item.name} className={classes.productImage} /> </Grid>
                                    <Grid item xs={10}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={6} style={{ paddingRight: '240px' }}>
                                                <Typography variant="h6"> {item.name} </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography variant="body1">Price: ₹{item.price}</Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography variant="body1">Quantity: {item.quantity}</Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography variant="body1">Total: ₹{item.price * item.quantity}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                        <Paper elevation={1} className={classes.addressContainer}>
                            <Typography variant="h6" gutterBottom> Delivery </Typography>
                            <Typography variant="h6" gutterBottom> Shipping Address </Typography>
                            <Typography variant="body1">
                                {order.shippingInfo &&
                                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                            </Typography>
                        </Paper>
                        <Paper elevation={1} className={classes.summaryContainer}>
                            <Typography variant="h6" gutterBottom> Order Summary </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={9}>
                                    <Typography variant="body1">Tax:</Typography>
                                    <Typography variant="body1">Shipping:</Typography>
                                    <Typography variant="body1">Total:</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="body1">₹{order && order.taxPrice}</Typography>
                                    <Typography variant="body1">₹{order && order.shippingPrice}</Typography>
                                    <Typography variant="body1">₹{order && order.totalPrice}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                        {formSubmitted ? (
                            <Typography variant="body1">Thank you for your feedback!</Typography>
                        ) : (
                            <form className={classes.commentForm} onSubmit={handleFormSubmit}>
                                <Typography variant="h6" gutterBottom> Leave a Comment </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">Rating:</Typography>
                                        <Rating name="rating" value={rating} onChange={(event, newValue) => setRating(newValue)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">Comment:</Typography>
                                        <TextField
                                            id="comment" variant="outlined" fullWidth multiline rows={4} 
                                            value={comment} onChange={(e) => setComment(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" variant="contained" color="primary" disabled={formSubmitted} > Submit </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};