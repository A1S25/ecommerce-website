import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../../actions/cartAction";
import { useAlert } from "react-alert";
import Checkout from "../checkout page/checkout";
import { useNavigate } from 'react-router-dom';
import { Typography, InputAdornment, TextField, Grid, Button, MenuItem } from '@material-ui/core';
import { Country, State } from "country-state-city";
import { useStyleShipping } from "./shippingStyle";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import MetaData from "../../layout/metadata/metadata";

export default function Shipping() {
    const classes = useStyleShipping();
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            alert.error("Phone Number should be 10 digits Long");
            return;
        }

        dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }));
        navigate("/order/confirm");
    };

    return (
        <Fragment>
            <MetaData title="Shipping Page" />

            <div className={classes.container}>
                <Checkout activeStep={0} />
                <div className={classes.contentContainer}>
                    <h2 className={classes.heading} >Shipping Details</h2>
                    <form className={classes.form} encType="multipart/form-data" onSubmit={handleSubmit}>
                        <Grid container spacing={0.5}>

                            <Grid item xs={12}>
                                <Typography component="h5" variant="h7">
                                    Address*
                                </Typography>
                                <TextField variant="outlined" margin="normal" fullWidth className={classes.textfield4}
                                    required name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography component="h5" variant="h7">
                                    City*
                                </Typography>
                                <TextField variant="outlined" margin="normal" fullWidth className={classes.textfield4}
                                    required name="city" value={city} onChange={(e) => setCity(e.target.value)} />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography component="h5" variant="h7">
                                    Pincode*
                                </Typography>
                                <TextField variant="outlined" margin="normal" fullWidth className={classes.textfield4} type="number"
                                    required name="pinCode" value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography component="h5" variant="h7">
                                    PhoneNo*
                                </Typography>
                                <TextField variant="outlined" margin="normal" fullWidth className={classes.textfield4} type="number"
                                    required name="phoneNo" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" fullWidth className={classes.textfield1}
                                    InputProps={{ startAdornment: (<InputAdornment position="start"> <AccountTreeIcon /> </InputAdornment>), }}
                                    select label="Select" margin="normal" style={{ marginLeft: "5px" }} name="country"
                                    value={country} onChange={(e) => setCountry(e.target.value)}
                                >
                                    <MenuItem value="">Country</MenuItem>
                                    {Country && Country.getAllCountries().map((item) => (
                                        <MenuItem key={item.isoCode} value={item.isoCode}> {item.name} </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" fullWidth className={classes.textfield1}
                                    InputProps={{ startAdornment: (<InputAdornment position="start"> <TransferWithinAStationIcon /> </InputAdornment>), }}
                                    select label="Select" margin="normal" style={{ marginLeft: "5px" }} name="state"
                                    value={state} onChange={(e) => setState(e.target.value)}
                                >
                                    <MenuItem value="">State</MenuItem>
                                    {country && State.getStatesOfCountry(country).map((item) => (
                                        <MenuItem key={item.isoCode} value={item.isoCode}> {item.name} </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Button type="submit" variant="contained" color="primary" disabled={state ? false : true} value="Continue" > Continue </Button>
                        </Grid>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};