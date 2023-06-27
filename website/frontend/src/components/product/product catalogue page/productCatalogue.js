import React, { Fragment, useEffect, useState } from 'react';
import { useStyleProductCatalogue } from './productCatalogueStyle';
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import ProductCard from '../product card/productCard';
import { Container, Grid, Typography, Paper, CssBaseline,
    Button, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { getProduct, clearErrors } from '../../../actions/productAction';
import Slider from "@material-ui/core/Slider";
import Loader from '../../layout/loader page/loader';
import MetaData from '../../layout/metadata/metadata';

const categories = ["Laptop", "Footwear", "Bottom", "Tops",
    "Attire", "Camera", "SmartPhones",];

export default function ProductCatalogue() {
    const classes = useStyleProductCatalogue();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { products, loading, error, productsCount } = useSelector((state) => state.products);

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const { keyword } = useParams();

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    const ratingHandler = (event, newRatings) => {
        setRatings(newRatings);
    };

    const loadMoreProducts = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);

        // Dispatch an action to load more products
        dispatch(getProduct(keyword, nextPage, price, category, ratings))
            .then(() => {
                // Scroll to the top of the newly loaded products
                window.scrollTo(0, 0);
            })
            .catch((error) => {
                alert.error(error);
            });
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Product Catalogue Page" />
                    <CssBaseline />

                    <Container className={classes.cardGrid} maxWidth="lg">
                        <Grid container spacing={4} >

                            <Grid item xs={12} sm={4} md={3}>
                                <Paper sx={{ p: 2 }} style={{ padding: '20px' }}>
                                    <Typography variant="h6" gutterBottom>
                                        Categories
                                    </Typography>

                                    <Typography>Price</Typography>
                                    <Slider
                                        value={price} onChange={priceHandler} valueLabelDisplay="auto"
                                        aria-labelledby="range-slider" min={0} max={25000}
                                    />

                                    <FormGroup>
                                        {categories.map((category) => (
                                            <FormControlLabel
                                                key={category}
                                                control={<Checkbox className={classes.checkbox} />}
                                                label={category}
                                                onChange={() => setCategory(category)}
                                            />
                                        ))}
                                    </FormGroup>

                                    <Typography>Rating</Typography>
                                    <Slider
                                        value={ratings}
                                        onChange={ratingHandler}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="rating-slider"
                                        min={1}
                                        max={5}
                                        marks
                                    />
                                </Paper>
                            </Grid>

                            {products && (
                                <Grid item container xs={12} sm={8} md={9} spacing={4}>
                                    {products.map((product) => (
                                        <Grid item key={product.id} xs={12} sm={6} md={4}>
                                            <ProductCard key={product._id} product={product} />
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Grid>

                        {productsCount > products.length && (
                            <Grid item xs={12} container justify="center">
                                <Button variant="contained" color="primary" onClick={loadMoreProducts}>
                                    Load More
                                </Button>
                            </Grid>
                        )}

                    </Container>
                </Fragment>
            )}
        </Fragment>
    );
};