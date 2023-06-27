import React, { Fragment, useEffect, useState } from 'react';
import { useStyleProductDetail } from './productDetailStyle';
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Rating } from "@material-ui/lab";
import { Container, Button, Grid, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@material-ui/core';
import { getProductDetails, getProduct, clearErrors } from '../../../actions/productAction';
import { addItemsToCart, addItemsToWishlist } from '../../../actions/cartAction';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loader from '../../layout/loader page/loader';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import ProductCard from '../product card/productCard';
import CustomerReview from './rating';
import MetaData from '../../layout/metadata/metadata';

export default function ProductDetail() {
    const classes = useStyleProductDetail();
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { error: productError, products } = useSelector((state) => state.products);

    console.log("reviews : " + JSON.stringify(product.reviews));

    const options = { size: "large", value: product.ratings, readOnly: true, precision: 0.5, };
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const ratingData = [];

    const settings = {
        dots: true, infinite: true, speed: 500, slidesToShow: 1,
        slidesToScroll: 1, autoplay: true, autoplaySpeed: 3000,
    };

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        navigate("/login?redirect=/cart");
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added To Cart");
    };

    const addToWishlistHandler = () => {
        dispatch(addItemsToWishlist(id));
        alert.success("Item Added To Wishlist");
        navigate("/login?redirect=/wishlist");
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (productError) {
            alert.error(productError);
            dispatch(clearErrors());
        }

        dispatch(getProductDetails(id));
        dispatch(getProduct());
    }, [dispatch, id, error, alert]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Product Detail Page" />
            
                    <Grid container spacing={2} style={{ marginTop: '10px' }}>
                        <Grid item xs={4} className={classes.carousel} style={{ paddingLeft: '15px' }}>
                            <Slider {...settings}>
                                {product.image && product.image.map((image, index) => (
                                    <img key={index} src={image.url} alt={`Carousel ${index}`} />
                                ))}
                            </Slider>
                        </Grid>

                        <Grid item xs={4} style={{ paddingLeft: '60px' }}>
                            <h2 className={classes.productName}>{product.name}</h2>
                            <p className={classes.productId}>Product # {product._id}</p>
                            <Rating {...options} className={classes.rating} style={{ marginTop: '10px' }} />
                            <span className={classes.numOfReviews}> {" "} ({product.numOfReviews} Reviews) </span>
                            <h1 className={classes.price} style={{ paddingLeft: '60px' }} >{`₹${product.price}`}</h1>
                        </Grid>

                        <Grid item xs={4} style={{ paddingLeft: '60px' }} className={classes.section3}>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <button className={classes.quantityButton} onClick={decreaseQuantity}>-</button>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1" className={classes.quantityText}>Quantity: {quantity}</Typography>
                                </Grid>
                                <Grid item>
                                    <button className={classes.quantityButton} onClick={increaseQuantity}>+</button>
                                </Grid>
                            </Grid>
                            <div>
                                <button
                                    disabled={product.stock < 1 ? true : false}
                                    onClick={addToCartHandler}
                                    className={classes.addToCartButton}
                                    style={{ marginLeft: '45px' }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                            <p className={classes.status} style={{ marginLeft: '47px' }}>
                                Status: {product.stock < 1 ? "OutOfStock" : "InStock"}
                            </p>
                            <div>
                                <button className={classes.buyNowButton} style={{ marginLeft: '52px' }} >
                                    Buy Now
                                </button>
                            </div>
                            <div>
                                <button className={classes.addToWishlistButton} style={{ marginLeft: '36px' }} onClick={addToWishlistHandler}>
                                    Add To Wishlist
                                </button>
                            </div>
                        </Grid>
                    </Grid>

                    <div className={classes.description} style={{ marginTop: '25px' }}>
                        <Typography variant="h6" gutterBottom> Product Description </Typography>
                        <Typography variant="body1"> {product.description} </Typography>
                    </div>

                    <Box mt={4}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">Additional Information</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body1"> {product.description} </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>

                    <Container maxWidth="lg" className={classes.container} style={{ marginTop: '25px' }} >
                        <Grid container spacing={4} >
                            <Grid item xs={12} md={6} className={classes.textContainer} >
                                <Typography variant="h6">Related Products</Typography>
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.buttonContainer} style={{ marginBottom: '5px' }} >
                                <Button variant="contained" color="primary"> See All </Button>
                            </Grid>
                        </Grid>
                        <div className={classes.cardContainer}>
                            <Grid container spacing={2} className={classes.productCardContainer}>
                                {products && products.slice(5, 9).map((product) => (
                                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                                        <ProductCard key={product._id} product={product} />
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </Container>

                    {product && product.reviews ? (
                        <div className="reviews">
                            {product.reviews.map((review) => {
                                const ratings = review.rating;
                                const existingItem = ratingData.find((ratingdata) => ratingdata.rating === ratings);
                                if (existingItem) {
                                    existingItem.counts += 1;
                                } else {
                                    const count = 1;
                                    ratingData.push({ rating: ratings, counts: count });
                                }
                                return (
                                    <React.Fragment key={review._id}>
                                        <CustomerReview key={review._id} review={review} reviewsLength={product.reviews.length} ratingdata={ratingData} />
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    ) : (
                        <Typography variant="h6">No Reviews Yet</Typography>
                    )}

                    <Container maxWidth="lg" className={classes.container} style={{ marginTop: '25px' }} >
                        <Grid container spacing={4} >
                            <Grid item xs={12} md={6} className={classes.textContainer} >
                                <Typography variant="h6">Recommended Products</Typography>
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.buttonContainer} style={{ marginBottom: '5px' }} >
                                <Button variant="contained" color="primary"> See All </Button>
                            </Grid>
                        </Grid>
                        <div className={classes.cardContainer}>
                            <Grid container spacing={2} className={classes.productCardContainer}>
                                {products && products.slice(5, 9).map((product) => (
                                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                                        <ProductCard key={product._id} product={product} />
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </Container>
                </Fragment>
            )}
        </Fragment>
    );
};