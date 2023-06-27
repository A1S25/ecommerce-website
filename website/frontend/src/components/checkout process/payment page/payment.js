import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useStylePayment } from './paymentStyle';
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { createOrder, clearErrors } from "../../../actions/orderAction";
import { Typography, Button } from "@material-ui/core";
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Checkout from '../checkout page/checkout';
import { loadStripe } from "@stripe/stripe-js"; // Added import
import MetaData from '../../layout/metadata/metadata';

export default function Payment() {
  const classes = useStylePayment();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();

  const [stripeApiKey, setStripeApiKey] = useState(""); // Added state to store the Stripe API key
  const [stripePromise, setStripePromise] = useState(null); // Define stripePromise variable

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = { amount: Math.round(orderInfo.totalPrice * 100) };
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
    id: user.user._id,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = false;

    try {
      const response = await axios.post('http://localhost:8000/api/v1/payments/payment/process', paymentData, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${stripeApiKey}` },
      });

      const client_secret = response.data.client_secret;

      if (!stripe || !elements) return;

      if (client_secret) {
        order.paymentInfo = {
          id: user.user._id,
          status: orderInfo.subtotal,
        };
        dispatch(createOrder(order));
        navigate("/success");
      } else {
        alert.error("There's some issue while processing payment ");
      }

    } catch (error) {
      payBtn.current.disabled = true;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchStripeApiKey = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/payments/stripeapikey', { headers: { 'Content-Type': 'application/json' }, });
        const apiKey = response.data.stripeApiKey;
        if (apiKey) { setStripeApiKey(apiKey); }
        else { console.error('Empty Stripe API key received'); }
      }
      catch (error) { console.error('Failed to retrieve Stripe API key:', error); }
    };
    fetchStripeApiKey();
  }, []);

  useEffect(() => {
    const loadStripePromise = async () => {
      if (stripeApiKey) {
        const stripePromise = await loadStripe(stripeApiKey);
        setStripePromise(stripePromise);
      }
    };
    loadStripePromise();
  }, [stripeApiKey]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
            <MetaData title="Payment Page" />

      <Checkout activeStep={2} />
      {stripePromise && (
        <Elements stripe={stripePromise}>
          <form onSubmit={(e) => submitHandler(e)} className={classes.paymentForm}>
            <Typography variant="h6" className={classes.cardInfoHeading}>Card Info</Typography>
            <div className={classes.cardElementContainer}>
              <CreditCardIcon className={classes.cardIcon} />
              <CardNumberElement className={classes.cardElement} />
            </div>
            <div className={classes.cardElementContainer}>
              <EventIcon className={classes.cardIcon} />
              <CardExpiryElement className={classes.cardElement} />
            </div>
            <div className={classes.cardElementContainer}>
              <VpnKeyIcon className={classes.cardIcon} />
              <CardCvcElement className={classes.cardElement} />
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.paymentFormBtn}
              ref={payBtn}
            >
              Pay - ₹{orderInfo && orderInfo.totalPrice}
            </Button>
            
          </form>
        </Elements>
      )}
    </Fragment>
  );
};

//<input type="submit" value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`} ref={payBtn} className="paymentFormBtn" />