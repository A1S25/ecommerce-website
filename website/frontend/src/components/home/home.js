import React, { Fragment, useEffect } from 'react';
import { useStyleHome } from './homeStyle';
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { getProduct, clearErrors } from '../../actions/productAction';
import ProductCard from '../product/product card/productCard';
import Loader from '../layout/loader page/loader';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Container, Typography, Grid, Button, Card, Avatar } from '@material-ui/core';
import laptop from '../../images/laptop1.jpeg';
import footbear from '../../images/footbear 2.jpeg';
import attire from '../../images/attire1.jpeg';
import bottom from '../../images/bottom1.jpeg';
import camera from '../../images/camera1.jpeg';
import tops from '../../images/tops1.jpeg';
import { Link } from "react-router-dom";
import MetaData from '../layout/metadata/metadata';

export default function Homes() {
  const classes = useStyleHome();
  const dispatch = useDispatch();
  const alert = useAlert();

  const carouselImages = [
    'https://source.unsplash.com/random',
    'https://source.unsplash.com/random',
    'https://source.unsplash.com/random',
  ];

  const settings = {
    dots: true, infinite: true, speed: 500, slidesToShow: 1,
    slidesToScroll: 1, autoplay: true, autoplaySpeed: 3000,
  };

  const categoryCards = [
    {
      id: 1,
      name: 'laptop',
      image: laptop,
    },
    {
      id: 2,
      name: 'footbear',
      image: footbear,
    },
    {
      id: 3,
      name: 'attire',
      image: attire,
    },
    {
      id: 4,
      name: 'bottom',
      image: bottom,
    },
    {
      id: 5,
      name: 'camera',
      image: camera,
    },
    {
      id: 6,
      name: 'tops',
      image: tops,
    },
  ];

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />

          <div className={classes.carouselContainer}>
            <Slider {...settings}>
              {carouselImages.map((image, index) => (
                <img key={index} src={image} alt={`Carousel ${index}`} className={classes.carouselImage} />
              ))}
            </Slider>
          </div>

          <div className={classes.leftContainer}>
            <Typography variant="h7">Shop Our Top Categories</Typography>
            <div className={classes.cardContainer1}>
              {/* Category Cards */}
              {categoryCards.map((category) => (
                <Link to={`/products/${category.name}`} key={category.id}>
                  <Card className={classes.categoryCard1} key={category.id}>
                    <div className={classes.categoryImage} style={{ backgroundImage: `url(${category.image})` }}>
                      <Typography variant="h6" className={classes.categoryName}>{category.name}</Typography>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={4} >
              <Grid item xs={12} md={6} className={classes.textContainer} >
                <Typography variant="h6">Featured Products</Typography>
              </Grid>
              <Grid item xs={12} md={6} className={classes.buttonContainer} >
                <Link to="/products">
                  <Button variant="contained" color="primary">
                    See All
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <div className={classes.cardContainer}>
              <Grid container spacing={2} className={classes.productCardContainer}>
                {products && products.slice(0, 4).map((product) => (
                  <Grid item key={product.id} xs={12} sm={6} md={4}>
                    <ProductCard key={product._id} product={product} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Container>

          <div className={classes.branddiv}>
            <Typography variant="h7">Choose By Brand</Typography>
            <div className={classes.buttonGroup}>
              {categoryCards.map((category) => (
                <Link to={`/products/${category.name}`} key={category.id}>
                  <Button className={classes.button}>
                    <Avatar className={classes.logo} alt="logo" src={category.image} />
                    <div>
                      <Typography className={classes.heading1} variant="h6">{category.name}</Typography>
                      <Typography className={classes.heading2} variant="body2">Click me!</Typography>
                    </div>
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <img src="https://source.unsplash.com/random" alt="Image" className={classes.image} />

          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={4} >
              <Grid item xs={12} md={6} className={classes.textContainer} >
                <Typography variant="h6">Most Selling Products</Typography>
              </Grid>
              <Grid item xs={12} md={6} className={classes.buttonContainer} >
                <Link to="/products">
                  <Button variant="contained" color="primary">
                    See All
                  </Button>
                </Link>
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