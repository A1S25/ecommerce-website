import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO,
  ADD_TO_WISHLIST, REMOVE_WISHLIST } from "../constants/cartConstants";
import axios from "axios";

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const response = await axios.get(`https://ecommerce-website-ufpp.onrender.com/api/v1/products/product/${id}`);
  const { cart } = getState();

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: response.data.product._id,
      name: response.data.product.name,
      price: response.data.product.price,
      image: response.data.product.image[0].url,
      stock: response.data.product.stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  const { cart } = getState();
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

// Add to wishlist
export const addItemsToWishlist = (id) => async (dispatch, getState) => {
  const response = await axios.get(`https://ecommerce-website-ufpp.onrender.com/api/v1/products/product/${id}`);

  const { wishlist } = getState();

  const newWishlistItem = {
    product: response.data.product._id,
    name: response.data.product.name,
    price: response.data.product.price,
    image: response.data.product.image[0].url,
  };

  dispatch({
    type: ADD_TO_WISHLIST,
    payload: newWishlistItem,
  });

  const updatedWishlist = [...(wishlist?.wishlistItems || []), newWishlistItem];
  localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
};

// Remove From Wishlist
export const removeItemsFromWishlist = (id) => async (dispatch, getState) => {
  const { wishlist } = getState();
  dispatch({
    type: REMOVE_WISHLIST,
    payload: id,
  });

  localStorage.setItem("wishlistItems", JSON.stringify(wishlist.wishlistItems));
};
