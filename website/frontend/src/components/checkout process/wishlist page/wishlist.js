import React, { Fragment } from 'react';
import { useStyleWishlist } from './wishlistStyle';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { addItemsToWishlist, removeItemsFromWishlist } from '../../../actions/cartAction';
import { Typography, Grid, Paper, Button } from '@material-ui/core';
import { Cancel as RemoveWishlistItemIcon } from '@material-ui/icons';
import { useAlert } from 'react-alert';
import MetaData from '../../layout/metadata/metadata';

export default function Wishlist() {
  const classes = useStyleWishlist();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { wishlistItems } = useSelector((state) => state.cart);

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemsFromWishlist(itemId));
  };

  const handleMoveToCart = (itemId) => {
    dispatch(addItemsToWishlist(itemId));
    alert.success("Item Added To Wishlist");
    navigate("/login?redirect=/cart");
  };

  return (
    <Fragment>
      <MetaData title="Wishlist Page" />

      {!wishlistItems || wishlistItems.length === 0 ? (
        <div>
          <RemoveWishlistItemIcon />
          <Typography>No Product in Your Wishlist</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className={classes.root}>
            <Typography variant="body1">Wishlist</Typography>
            <Grid container spacing={2}>
              {wishlistItems && wishlistItems.map((item) => (
                <Paper elevation={1} className={classes.productContainer}>
                  <img src={item.image} alt={item.name} className={classes.productImage} />
                  <Typography variant="h6" className={classes.productName}> {item.name} </Typography>
                  <Typography variant="body1" className={classes.productPrice}> Price: ₹{item.price} </Typography>
                  <div className={classes.ratingContainer}></div>
                  <Typography variant="body2" className={classes.totalRating}></Typography>
                  <Button variant="outlined" color="secondary" onClick={() => handleRemoveItem(item.product)}
                    className={classes.removeButton} style={{ marginTop: '5px' }} >
                    Remove
                  </Button>
                  <Button variant="outlined" color="primary" onClick={() => handleMoveToCart(item.product)}
                    className={classes.moveToCartButton} style={{ marginTop: '10px' }} >
                    Move to Cart
                  </Button>
                </Paper>
              ))}
            </Grid>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};