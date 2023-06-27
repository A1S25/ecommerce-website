import React, { Fragment } from 'react';
import { useStyleCart } from './cartStyle';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Typography, Paper, Button, Grid } from '@material-ui/core';
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import { addItemsToCart, removeItemsFromCart } from '../../../actions/cartAction';
import MetaData from '../../layout/metadata/metadata';

export default function Cart() {
    const classes = useStyleCart();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        dispatch(addItemsToCart(id, newQty));
    };

    const calculateSubtotal = (item) => {
        return item.price * item.quantity;
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    const handleCheckout = () => {
        navigate("/login?redirect=/shipping");
    };

    return (
        <Fragment>
            <MetaData title="Cart Page" />

            {!cartItems || cartItems.length === 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />
                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/products">View Products</Link>
                </div>
            ) : (
                <Fragment>
                    <div className={classes.root}>
                        <Typography variant="h4" gutterBottom>
                            Cart
                        </Typography>

                        {cartItems && cartItems.map((item) => (
                            <Paper elevation={1} key={item.id} className={classes.productContainer}>
                                <img src={item.image} alt={item.name} className={classes.productImage} />
                                <div className={classes.productInfoContainer}>
                                    <Typography variant="h6" className={classes.productName}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body1" className={classes.productPrice}>
                                        Price: ₹{item.price}
                                    </Typography>
                                    <div className={classes.productQuantityContainer}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            className={classes.quantityButton}
                                            onClick={() => decreaseQuantity(item.product, item.quantity)}
                                            disabled={item.quantity === 1}
                                        >
                                            -
                                        </Button>
                                        <Typography variant="body1" className={classes.quantityText}>
                                            {item.quantity}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            className={classes.quantityButton}
                                            onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}
                                            disabled={item.quantity === item.stock}
                                        >
                                            +
                                        </Button>
                                    </div>
                                    <Typography variant="body1" className={classes.productSubtotal}>
                                        Subtotal: ₹{calculateSubtotal(item)}
                                    </Typography>
                                </div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleCheckout(item.id)}
                                    className={classes.checkoutButton}
                                >
                                    Proceed To Checkout
                                </Button>
                            </Paper>
                        ))}
                        <Paper elevation={1} className={classes.totalContainer}>
                <Grid container justify="space-between">
                    <Grid item>
                        <Typography variant="body1">Total:</Typography>
                    </Grid>
                    <Grid item style={{ paddingRight: '60px' }}>
                        <Typography variant="body1">₹{calculateTotal()}</Typography>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={0} className={classes.checkoutContainer}>
                <Grid container justify="flex-end">
                    <Grid item style={{ paddingRight: '10px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCheckout}
                            className={classes.checkoutButton}
                            disabled={cartItems.length === 0}
                        >
                            Proceed To Checkout
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};
