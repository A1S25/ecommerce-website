const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct,
  getProductDetails, createProductReview, getProductReviews,
  deleteReview, getAdminProducts, } = require("../controller/productController");

const router = express.Router();

const multer = require('multer');
// Configure multer storage
const storage = multer.memoryStorage(); // Store the file in memory as Buffer
const upload = multer({ storage });

router.route("/products").get(getAllProducts);
router.route("/admin/products").get( getAdminProducts);
router.route("/admin/product/new").post(upload.array('images', 3), createProduct);
router.route("/admin/product/:id")
  .put(upload.array('images', 3), updateProduct)
  .delete(upload.array('images', 3), deleteProduct);
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(createProductReview);
router.route("/reviews")
  .get(getProductReviews)
  .delete(deleteReview);

module.exports = router;