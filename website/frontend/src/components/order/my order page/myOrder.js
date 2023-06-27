import React, { Fragment, useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../../actions/orderAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import Loader from '../../layout/loader page/loader';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import MetaData from '../../layout/metadata/metadata';

export default function Myorder() {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
        { field: "status", headerName: "Status", minWidth: 300, flex: 0.5 },
        { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 150, flex: 0.3, },
        { field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5, },
        {
            field: "actions", flex: 0.3, headerName: "Actions", minWidth: 150, type: "number", sortable: false,
            renderCell: (params) => { return (<Link to={`/order/${params.getValue(params.id, "id")}`}> <MoreVertIcon /> </Link>); },
        },
    ];

    const rows = [];

    orders && orders.forEach((item, index) => {
        rows.push({ itemsQty: item.orderItems.length, id: item._id, status: item.orderStatus, amount: item.totalPrice, });
    });

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(myOrders());
    }, [dispatch, alert, error]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="MyOrder Page" />

                    <div>
                        <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
                        <Typography>{user.firstName}'s Orders</Typography>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};