import React, { Fragment, useEffect, useState } from "react";
import { useStyleUpdateProduct } from "./updateProductStyle";
import { Typography, InputAdornment, TextField, Grid, Button, MenuItem } from '@material-ui/core';
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import Sidebar from "../../sidebar/sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom';
import { UPDATE_PRODUCT_RESET } from "../../../../constants/productConstants";
import { updateProduct, getProductDetails, clearErrors } from "../../../../actions/productAction";
import { useParams } from 'react-router-dom';
import MetaData from "../../../layout/metadata/metadata";

export default function UpdateProduct() {
  const classes = useStyleUpdateProduct();
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, product } = useSelector((state) => state.productDetails);
  const { loading, error: updateError, isUpdated, } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(null);
  //const [oldImage, setOldImage] = useState(null);

  const { id } = useParams();

  const categories = ["Laptop", "Footwear", "Bottom", "Tops",
    "Attire", "Camera", "SmartPhones",];

  const handleImageChange = (e) => {
    setImage(e.target.files);
  }

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
    dispatch(updateProduct(id, formData));
  };

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      //setOldImage(product.image);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/seller/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, id, product, updateError,]);

  return (
    <Fragment>
      <MetaData title="Update Product Page" />

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
                <Typography component="h5" variant="h7"> Product Image Preview </Typography>
                {image && Array.from(image).map((img, index) => (
                  <img key={index} src={URL.createObjectURL(img)} alt="" style={{ width: "200px", marginTop: "10px" }} />
                ))}
                <Typography component="h5" variant="h7"> Product Old Image Preview </Typography>
                {product.image && Array.isArray(product.image) ? (
                  product.image.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt=""
                      style={{ width: "200px", marginTop: "10px" }}
                    />
                  ))
                ) : product.image ? (
                  <img
                    src={product.image.url}
                    alt=""
                    style={{ width: "200px", marginTop: "10px" }}
                  />
                ) : (
                  <span>No image available</span>
                )}

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
  );
};