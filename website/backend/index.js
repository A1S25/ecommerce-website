// server related file import
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const path = require("path");

// Route related file import
const user = require("./routes/userRoute");
const product = require("./routes/productRoute");
const payment = require("./routes/paymentRoute");
const order = require("./routes/orderRoute");

//database configuration
if(process.env.NODE_ENV !=="PRODUCTION"){
  require("dotenv").config();
}

//Database mongoose connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected");

    //express related code
    const app = express();
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(cors());

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    app.use("/api/v1/user", user);
    app.use("/api/v1/products", product);
    app.use("/api/v1/payments", payment);
    app.use("/api/v1/orders", order);

    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
    });

    // server listen
    app.listen( 8000, () => console.log("Backend is running") )
  })
  .catch((error) => {
    console.log("Failed");
    throw new Error(error);
  })
