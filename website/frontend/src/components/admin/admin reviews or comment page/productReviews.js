import React, { useState, Fragment, useEffect } from 'react';
import { useStyleProductReviews } from './productReviewsStyle';
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button, Typography, TextField, Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { getAllReviews, deleteReviews, clearErrors } from '../../../actions/productAction';
import { DELETE_REVIEW_RESET } from '../../../constants/productConstants';
import MetaData from '../../layout/metadata/metadata';

export default function ProductReviews() {
    const classes = useStyleProductReviews();
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error: deleteError, isDeleted } = useSelector((state) => state.review);
    const { error, reviews, loading } = useSelector((state) => state.productReviews);

    const [productId, setProductId] = useState("");

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviews(reviewId, productId));
    };

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    };

    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
        { field: "user", headerName: "User", minWidth: 200, flex: 0.6, },
        { field: "comment", headerName: "Comment", minWidth: 350, flex: 1, },
        {
            field: "rating", headerName: "Rating", type: "number", minWidth: 180, flex: 0.4,
            cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3 ? "greenColor" : "redColor";
            },
        },
        {
            field: "actions", flex: 0.3, headerName: "Actions", minWidth: 150, type: "number", sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Button onClick={() => deleteReviewHandler(params.getValue(params.id, "id"))} > <DeleteIcon /> </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    reviews && reviews.forEach((item) => {
        const fullName = `${item.firstName} ${item.lastName}`;
        rows.push({ id: item._id, rating: item.rating, comment: item.comment, user: fullName });
    });

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Review Deleted Successfully");
            navigate("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET });
        }
    }, [dispatch, alert, error, deleteError, navigate, isDeleted, productId]);

    return (
        <Fragment>
            <MetaData title="Product Review Page" />

            <div className={classes.container}>
                <Typography variant="h4" className={classes.title}>
                    All Reviews
                </Typography>
                <form onSubmit={productReviewsSubmitHandler} className={classes.form}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <TextField
                                type="text"
                                placeholder="Product ID"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                variant="outlined"
                                className={classes.input}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                type="submit"
                                disabled={loading || productId === ""}
                                variant="contained"
                                color="primary"
                            >
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {reviews && reviews.length > 0 ? (
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={rows} columns={columns} pageSize={10} autoHeight />
                    </div>
                ) : (
                    <Typography variant="h5" className={classes.noReviews}>
                        No Reviews Found
                    </Typography>
                )}
            </div>
        </Fragment>
    )
};