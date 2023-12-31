import {
  CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS, MY_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAIL, ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, CLEAR_ERRORS,
} from "../constants/orderConstants";
import axios from "axios";

// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const response = await axios.post("https://ecommerce-website-ufpp.onrender.com/api/v1/orders/order/new", order, {
      headers: { 'Content-Type': 'application/json', },
    });
    console.log(response.data);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message, });
  }
};

// My Orders
export const myOrders = (id) => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const response = await axios.post("https://ecommerce-website-ufpp.onrender.com/api/v1/orders/orders/me", id);
    console.log(response.data);
    dispatch({ type: MY_ORDERS_SUCCESS, payload: response.data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const response = await axios.get("https://ecommerce-website-ufpp.onrender.com/api/v1/orders/admin/orders");

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: response.data.orders });
  } catch (error) {
    dispatch({ type: ALL_ORDERS_FAIL, payload: error.response.data.message, });
  }
};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.put(
      `https://ecommerce-website-ufpp.onrender.com/api/v1/orders/admin/order/${id}`,
      order,
      config
    );

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: response.data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const response = await axios.delete(`https://ecommerce-website-ufpp.onrender.com/api/v1/orders/admin/order/${id}`);

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: response.data.success });
  } catch (error) {
    dispatch({ type: DELETE_ORDER_FAIL, payload: error.response.data.message, });
  }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    console.log(id);

    const response = await axios.get(`https://ecommerce-website-ufpp.onrender.com/api/v1/orders/order/${id}`);

    console.log("order : " + JSON.stringify(response.data));

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: response.data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
