import React from 'react';
import { useStyleProductCard } from './productCardStyle';
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core';

export default function ProductCard({ product }) {
    const classes = useStyleProductCard();

    const images = product.image;
    const image = Array.isArray(images) && images.length > 0 ? images[0].url : null;
    const options = { value: product.ratings, readOnly: true, precision: 0.5, };

    return (
        <Link to={`/product/${product._id}`} className={classes.card}>
            <Card>
                {image && ( <CardMedia className={classes.cardMedia} image={image} title={product.name} /> )}
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2"> {product.name} </Typography>
                    <div>
                        <Rating {...options} />
                        <span>{` (${product.numofReviews} Reviews)`}</span>
                    </div>
                    <Typography>  {`₹${product.price}`} </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" component={Link} to={``}> Add to Cart </Button>
                </CardActions>
            </Card>
        </Link>
    );
};