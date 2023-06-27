import React, { useEffect, Fragment } from 'react';
import { useStyleAdminDashboard } from './adminDashboardStyle';
import { Container, Typography, Grid, Paper, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../../actions/productAction";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import MetaData from '../../layout/metadata/metadata';

export default function AdminDashboards() {
    const classes = useStyleAdminDashboard();
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);

    const sales = [];
    products && products.forEach((item) => {
        const stock = item.stock;
        const categorys = item.category;
        const numofreviews = item.numOfReviews;
        const existingItem = sales.find((sale) => sale.categor === categorys);
        if (existingItem) {
            existingItem.stocks += stock;
            existingItem.numReviews += numofreviews;
        } else {
            sales.push({ categor: categorys, stocks: stock, numReviews: numofreviews });
        }
    });
    const categoryAnalyticsData = sales.map((item) => ({ category: item.categor, sales: item.stocks, count: item.numReviews, }));

    const ratings = [];
    products && products.forEach((item) => {
        const price = item.price;
        const rating = item.ratings;
        const categorys = item.category;
        const existingItem = ratings.find((rating) => rating.categor === categorys);
        if (existingItem) {
            existingItem.ratings += rating;
            existingItem.prices += price;
        } else {
            ratings.push({ categor: categorys, ratings: rating, prices: price });
        }
    });
    const ratingAnalyticsData = ratings.map((item) => ({ category: item.categor, rating: item.ratings, price: item.prices, }));


    useEffect(() => { dispatch(getAdminProduct()); }, [dispatch]);

    return (
        <Fragment>
            <MetaData title="Admin Dashboard Page" />

            <Container className={classes.container}>
                <Typography variant="h4" className={classes.title}>
                    Admin Dashboard
                    <div>
                        <Button component={Link} to="/admin/users" color="primary" variant="contained" style={{ marginRight: '8px' }}>
                            User Information
                        </Button>
                        <Button component={Link} to="/admin/reviews" color="secondary" variant="contained">
                            Comment Information
                        </Button>
                    </div>
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6">Category Analytics</Typography>
                            <BarChart width={500} height={300} data={categoryAnalyticsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" /> <YAxis /> <Tooltip /> <Legend />
                                <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                                <Bar dataKey="count" fill="#82ca9d" name="Count" />
                            </BarChart>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6">Seller Analytics</Typography>
                            <BarChart width={500} height={300} data={ratingAnalyticsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" /> <YAxis /> <Tooltip /> <Legend />
                                <Bar dataKey="price" fill="#8884d8" name="Price" />
                                <Bar dataKey="rating" fill="#82ca9d" name="Rating" />
                            </BarChart>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    );
};