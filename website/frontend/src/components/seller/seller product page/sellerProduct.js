import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Sidebar from "../sidebar/sidebar";
import { useStyleSellerProduct } from "./sellerProductStyle";
import { Typography, Container, TextField, Button, Select, MenuItem, InputAdornment } from '@material-ui/core';
import { Search as SearchIcon, Add as AddIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct, deleteProduct, clearErrors } from "../../../actions/productAction";
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DELETE_PRODUCT_RESET } from "../../../constants/productConstants";
import MetaData from "../../layout/metadata/metadata";

export default function SellerProduct() {
    const classes = useStyleSellerProduct();
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, products } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted } = useSelector((state) => state.product);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        { field: "name", headerName: "Name", minWidth: 350, flex: 1, },
        { field: "stock", headerName: "Stock", type: "number", minWidth: 150, flex: 0.3, },
        { field: "price", headerName: "Price", type: "number", minWidth: 270, flex: 0.5, },
        {
            field: "actions", headerName: "Actions", type: "number", minWidth: 150, flex: 0.3, sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/seller/product/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

                        <Button onClick={() => deleteProductHandler(params.getValue(params.id, "id"))} >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    products && products.forEach((item) => {
        rows.push({ id: item._id, stock: item.stock, price: item.price, name: item.name, });
    });

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Product Deleted Successfully");
            navigate("/seller/dashboard");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getAdminProduct());
    }, [dispatch, alert, error, deleteError, navigate, isDeleted]);


    return (
        <Fragment>
            <MetaData title="Product Page" />

            <div className={classes.root}>
                {/* Sidebar Component */}
                <Sidebar />

                {/* Main Content */}
                <div className={classes.content}>
                    <Typography variant="h4" component="h1" className={classes.heading}>
                        Main Content Heading
                    </Typography>

                    <Container className={classes.container}>
                        <div className={classes.searchBar}>
                            <TextField variant="outlined" size="small" placeholder="Search..."
                                InputProps={{
                                    startAdornment: (<InputAdornment position="start"> <SearchIcon /> </InputAdornment>),
                                }}
                            />
                            <Select className={classes.selectButton} value="" variant="outlined">
                                <MenuItem value="">Option 1</MenuItem>
                                <MenuItem value="">Option 2</MenuItem>
                                <MenuItem value="">Option 3</MenuItem>
                            </Select>
                            <Button className={classes.addButton} variant="contained" color="primary"
                                startIcon={<AddIcon />} component={Link} to="/seller/product" >
                                New Product
                            </Button>
                        </div>
                        <div className={classes.dataGrid}>
                            <DataGrid rows={rows} columns={columns} pageSize={10}
                                autoHeight checkboxSelection disableColumnMenu />
                        </div>
                    </Container>
                </div>
            </div>
        </Fragment>
    )
};