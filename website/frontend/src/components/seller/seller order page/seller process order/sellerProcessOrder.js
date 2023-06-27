import React, { useEffect, useState } from 'react';
import { useStyleSellerProcessOrder } from './sellerProcessOrderStyle';
import { useAlert } from "react-alert";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../../../layout/loader page/loader';
import { getOrderDetails, updateOrder, clearErrors } from '../../../../actions/orderAction';
import { UPDATE_ORDER_RESET } from '../../../../constants/orderConstants';
import { Typography, Button } from "@material-ui/core";
import { getUserDetails } from '../../../../actions/userAction';
import MetaData from '../../../layout/metadata/metadata';

export default function SellerProcessOrder() {
    const classes = useStyleSellerProcessOrder();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.userDetails);

    const name = `${user.firstName} ${user.lastName}`;

    const [status, setStatus] = useState("");
    const { id } = useParams();

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('status', status);
        dispatch(updateOrder(id, formData));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Order Updated Successfully");
            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id, isUpdated, updateError]);

    useEffect(() => {
        if (order?.user?._id) {
            dispatch(getUserDetails(order.user._id));
        }
    }, [dispatch, order]);

    return (
        <div className={classes.root}>
            {loading ? (
                <Loader />
            ) : (
                <div>
                  <MetaData title="Process Order Page" />
            
                    <div className={classes.infoContainer}>
                        <Typography variant="subtitle1" className={classes.label}>
                            Name:
                        </Typography>
                        <Typography variant="body1" className={classes.value}>
                            {name}
                        </Typography>
                    </div>
                    <div className={classes.infoContainer}>
                        <Typography variant="subtitle1" className={classes.label}>
                            Phone:
                        </Typography>
                        <Typography variant="body1" className={classes.value}>
                            {order?.shippingInfo?.phoneNo || ''}
                        </Typography>
                    </div>
                    <div className={classes.infoContainer}>
                        <Typography variant="subtitle1" className={classes.label}>
                            Address:
                        </Typography>
                        <Typography variant="body1" className={classes.value}>
                            {order &&
                                `${order.shippingInfo?.address || ""}, ${order.shippingInfo?.city || ""}, ${order.shippingInfo?.state || ""}, ${order.shippingInfo?.pinCode || ""}, ${order.shippingInfo?.country || ""}`}
                        </Typography>
                    </div>
                    <div className={classes.infoContainer}>
                        <Typography variant="subtitle1" className={classes.label}>
                            Payment Info Status:
                        </Typography>
                        <Typography variant="body1" className={classes.value}>
                            {order?.paymentInfo?.status}
                        </Typography>
                    </div>
                    <div className={classes.infoContainer}>
                        <Typography variant="subtitle1" className={classes.label}>
                            Amount:
                        </Typography>
                        <Typography variant="body1" className={classes.value}>
                            {order?.totalPrice}
                        </Typography>
                    </div>
                    <div className={classes.infoContainer}>
                        <Typography variant="subtitle1" className={classes.label}>
                            Order Status:
                        </Typography>
                        <Typography variant="body1" className={classes.value}>
                            {order?.orderStatus}
                        </Typography>
                    </div>

                    <div className={classes.formContainer}>
                        <form onSubmit={updateOrderSubmitHandler}>
                            <Typography variant="h5">Process Order</Typography>
                            <select className={classes.select} onChange={(e) => setStatus(e.target.value)}>
                                <option value="">Choose Category</option>
                                {order.orderStatus === "Processing" && (
                                    <option value="Shipped">Shipped</option>
                                )}

                                {order.orderStatus === "Shipped" && (
                                    <option value="Delivered">Delivered</option>
                                )}
                            </select>
                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton}
                              disabled={ loading ? true : false || status === "" ? true : false } >
                                Process
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
};