import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "../../sidebar/sidebar";
import { useStyleNewProduct } from "./newProductStyle";
import { Typography, InputAdornment, TextField, Grid, Button, MenuItem } from '@material-ui/core';
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, clearErrors } from "../../../../actions/productAction";
import { NEW_PRODUCT_RESET } from "../../../../constants/productConstants";
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom';
import MetaData from "../../../layout/metadata/metadata";

export default function NewProduct() {
    const classes = useStyleNewProduct();
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.newProduct);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState(null);

    const categories = ["Laptop", "Footwear", "Bottom", "Tops",
        "Attire", "Camera", "SmartPhones",];

    const handleImageChange = (e) => {
        setImage(e.target.files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('stock', stock);

        for (let i = 0; i < image.length; i++) {
            formData.append('images', image[i]);
        }

        console.log(...formData);
        dispatch(createProduct(formData));
    };

    useEffect(() => {
        if (error) { dispatch(clearErrors()); }
        if (success) {
            alert.success("Product Created Successfully");
            navigate("/seller/dashboard");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, alert, navigate, error, success]);


    return (
        <Fragment>
            <MetaData title="About Page" />

            <div className={classes.root}>
                <Sidebar />
                <div className={classes.content}>
                    <form className={classes.form} encType="multipart/form-data" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <Typography component="h5" variant="h7"> Name* </Typography>
                                <TextField variant="outlined" margin="normal" fullWidth className={classes.textfield4}
                                    required name="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography component="h5" variant="h7"> Price* </Typography>
                                <TextField variant="outlined" margin="normal" fullWidth className={classes.textfield4}
                                    required type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography component="h5" variant="h7"> Product Description* </Typography>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                                    cols="30" rows="1" ></textarea>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography component="h5" variant="h7"> Choose Category* </Typography>
                                <TextField variant="outlined" fullWidth className={classes.textfield1}
                                    InputProps={{ startAdornment: (<InputAdornment position="start"> <AccountTreeIcon /> </InputAdornment>), }}
                                    select label="Select" margin="normal" style={{ marginLeft: '5px' }}
                                    name="category" value={category} onChange={(e) => setCategory(e.target.value)}
                                >
                                    <MenuItem value="">Choose Category</MenuItem>
                                    {categories.map((cate) => (
                                        <MenuItem key={cate} value={cate}> {cate} </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography component="h5" variant="h7"> Stock* </Typography>
                                <TextField variant="outlined" margin="normal" fullWidth className={classes.textfield1}
                                    required type="number" name="stock" value={stock} onChange={(e) => setStock(e.target.value)} />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography component="h5" variant="h7"> Product Image* </Typography>
                                <input type="file" accept="image/*" onChange={handleImageChange} name="image" multiple />

                                {image && Array.from(image).map((img, index) => (
                                    <img key={index} src={URL.createObjectURL(img)} alt="" style={{ width: "200px", marginTop: "10px" }} />
                                ))}
                            </Grid>

                            <Button type="submit" fullWidth variant="contained" color="grey" className={classes.button} style={{
                                marginTop: '8px', borderRadius: '20px', '&:hover': { backgroundColor: 'yellow', },
                            }} disabled={loading ? true : false}
                            >
                                Create
                            </Button>

                        </Grid>
                    </form>
                </div>
            </div>
        </Fragment>
    )
};