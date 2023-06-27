import React, { Fragment } from 'react';
import { useStyleConfirmOrder } from './confirmOrderStyle';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import Checkout from '../checkout page/checkout';
import { Typography, Grid, Card, CardMedia, CardContent, Button } from "@material-ui/core";
import MetaData from '../../layout/metadata/metadata';

export default function ConfirmOrder() {
    const classes = useStyleConfirmOrder();
    const navigate = useNavigate();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const name = user.user.firstName + " " + user.user.lastName;
    const address = `₹{shippingInfo.address}, ₹{shippingInfo.city}, ₹{shippingInfo.state}, ₹{shippingInfo.pinCode}, ₹{shippingInfo.country}`;

    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const shippingCharges = subtotal > 1000 ? 0 : 200;
    const tax = 0.09 * subtotal;
    const totalPrice = subtotal + tax + shippingCharges;;

    const proceedToPayment = () => {
        const data = { subtotal, shippingCharges, tax, totalPrice, };
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate("/process/payment");
    };

    return (
        <Fragment>
            <MetaData title="Confirm Order Page" />

            <Checkout activeStep={1} />
            <div className={classes.root}>
                <Typography variant="h4" gutterBottom>
                    Order Confirmation
                </Typography>

                <Typography variant="h5" gutterBottom>
                    Shipping Details
                </Typography>

                <Card className={classes.item}>
                    <CardContent>
                        <Typography variant="body1" gutterBottom>
                            User Name: {name}
                        </Typography>
                        <Typography variant="body1">Phone Number: {shippingInfo.phoneNo} </Typography>
                        <Typography variant="body1" gutterBottom>
                            Address: {address}
                        </Typography>
                    </CardContent>
                </Card>

                <Typography variant="h5" gutterBottom>
                    Order Summary
                </Typography>

                {cartItems && cartItems.map((item) => (
                    <Card key={item.id} className={classes.item}>
                        <CardMedia className={classes.image} component="img" src={item.image} alt={item.name} />
                        <CardContent>
                            <Typography variant="body1" gutterBottom>
                                {item.name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {item.quantity} x ₹{item.price.toFixed(2)} = ₹{(item.quantity * item.price).toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}

                <div className={classes.subtotal}>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="body1" gutterBottom>
                                Subtotal: ₹{subtotal.toFixed(2)}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                GST (9%): ₹{tax.toFixed(2)}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Shipping Charges: ₹{shippingCharges}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" align="right">
                                Total: ₹{totalPrice.toFixed(2)}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>

                <Grid container justify="flex-end">
                    <Grid item>
                        <Button variant="contained" color="primary" className={classes.payButton} onClick={proceedToPayment}>
                            Pay
                        </Button>
                    </Grid>
                </Grid>

            </div>
        </Fragment>
    );
};