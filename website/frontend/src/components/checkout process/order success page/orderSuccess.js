import React, { Fragment } from 'react';
import { useStyleOrderSuccess } from './orderSuccessStyle';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import MetaData from '../../layout/metadata/metadata';

export default function OrderSuccess() {
    const classes = useStyleOrderSuccess();

    return (
        <Fragment>
            <MetaData title="Order Success Page" />

            <div className={classes.container}>
                <CheckCircleIcon className={classes.icon} />
                <Typography className={classes.text}>Your Order has been Placed successfully</Typography>
                <Link to="/orders" className={classes.link}>View Orders</Link>
            </div>
        </Fragment>
    );
};