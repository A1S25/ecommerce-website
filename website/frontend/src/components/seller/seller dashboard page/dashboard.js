import React, { useEffect } from "react";
import Sidebar from "../sidebar/sidebar";
import { useStyleSellerDashboard } from "./dashboardStyle";
import { Typography, Grid, Paper, Card, CardContent, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../../actions/productAction";
import { getAllOrders } from "../../../actions/orderAction";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import MetaData from "../../layout/metadata/metadata";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ffc658', '#8884d8', '#bd4519', '#b6002a'];

export default function Dashboard() {
    const classes = useStyleSellerDashboard();
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);

    const array = [];
    products && products.forEach((item) => {
        const stock = item.stock;
        const categorys = item.category;
        const existingItem = array.find((array) => array.categor === categorys);
        if (existingItem) {
            existingItem.stocks += stock;
        } else {
            array.push({ categor: categorys, stocks: stock });
        }
    });

    const ratings = [];
    products && products.forEach((item) => {
        const numofreviews = item.numOfReviews;
        const category = item.category;
        const existingItem = ratings.find((rating) => rating.categories === category);
        if (existingItem) {
            existingItem.numReviews += numofreviews;
        } else {
            ratings.push({ categories: category, numReviews: numofreviews });
        }
    });

    const sales = [];
    let totalAmount = 0;
    let initial = 0;
    orders && orders.forEach((item) => {
        totalAmount += item.totalPrice;
        sales.push({ initialamount: initial, sale: totalAmount });
    });

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
    }, [dispatch]);

    return (
        <div>
          <MetaData title="Dashboard Page" />
    
            <div className={classes.sidebarContainer}>
                <Sidebar />
            </div>
            <div className={classes.root}>
                <Typography variant="h4" gutterBottom>
                    Seller Dashboard
                </Typography>
                <div className={classes.buttonContainer}>
                    <Button component={Link} to="/seller/products" variant="contained" color="#dc3545">
                        Go to Product Page
                    </Button>
                    <Button component={Link} to="/seller/orders" variant="contained" color="#dc3545">
                        Go to Order Page
                    </Button>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="h6">Total Sales</Typography>
                                        <Typography variant="h5">500</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="h6">Total Orders</Typography>
                                        <Typography variant="h5">200</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="h6">Average Sales</Typography>
                                        <Typography variant="h5">250</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="h6">Average Order Value</Typography>
                                        <Typography variant="h5">$50</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ paddingLeft: '355px' }}>
                        <Paper elevation={1} className={classes.analyticsContainer}>
                            <Typography variant="h6" className={classes.analyticsTitle}>
                                Sales Analytics
                            </Typography>
                            <div className={classes.chartContainer}>
                                <ResponsiveContainer>
                                    <LineChart data={sales}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="sale" /> <YAxis /> <Tooltip /> <Legend />
                                        <Line type="monotone" dataKey="sale" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} style={{ paddingLeft: '355px' }}>
                        <Paper elevation={1} className={classes.analyticsContainer}>
                            <Typography variant="h6" className={classes.analyticsTitle}>
                                Category Analytics
                            </Typography>
                            <div className={classes.chartContainer}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie dataKey="numReviews" data={ratings} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label >
                                            {ratings.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip /> <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} style={{ paddingLeft: '355px' }}>
                        <Paper elevation={1} className={classes.analyticsContainer}>
                            <Typography variant="h6" className={classes.analyticsTitle}>
                                Rating Analytics
                            </Typography>
                            <div className={classes.chartContainer}>
                                <ResponsiveContainer>
                                    <RadarChart data={array}>
                                        <PolarGrid /> <PolarAngleAxis dataKey="categor" />
                                        <Radar name="Stocks" dataKey="stocks" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                        <Tooltip /> <Legend />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};