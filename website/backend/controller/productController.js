const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeature");
const cloudinary = require("cloudinary").v2;

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: 'No files uploaded' });
  }
  const file = req.files;

  const images = [];
  const uploadPromises = req.files.map((file) => {
    const uploadOptions = { folder: 'produc', public_id: `image_${Date.now()}`, resource_type: 'auto' };
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
        if (error) { reject(error); }
        else {
          images.push({ url: result.secure_url, public_id: result.public_id });
          resolve();
        }
      }).end(file.buffer);
    });
  });
  await Promise.all(uploadPromises);

  const { name, price, description, category, stock } = req.body;
  const product = await Product.create({
    name, price, description, category, stock, image: images
  });

  res.status(201).json({ success: true, product, });
});

// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 12;
  const currentPage = req.query.page || 1;

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage, currentPage);

  const products = await apiFeature.queryExec();
  const productsCount = await Product.countDocuments();

  res.status(200).json({ success: true, products, productsCount, });
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

  const products = await Product.find();

  res.status(200).json({ success: true, products, });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.params.id);
  if (!product) { return next(new ErrorHander("Product not found", 404)); }

  res.status(200).json({ success: true, product, });
});

// Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: 'No files uploaded' });
  }

  let product = await Product.findById(req.params.id);
  if (!product) { return next(new ErrorHander("Product not found", 404)); };

  const images = product.images || [];
  const newImage = req.files && req.files.length > 0 ? req.files[0] : undefined;
  const newImageBuffer = newImage && newImage.length > 0 && newImage[0].buffer ? newImage[0].buffer.toString('base64') : null;

  // Images Start Here
  const imageToUpdate = images.length > 0 ? images[0] : {};
  const uploadOptions = { public_id: imageToUpdate.public_id, folder: 'produc', resource_type: 'auto', overwrite: true };

  cloudinary.uploader.upload(`data:image/jpeg;base64,${newImageBuffer}`, uploadOptions, (error, result) => {
    if (error) { console.log('Error updating image:', error); } 
    else { console.log('Updated image:', result); }
  });

  product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false });
  res.status(200).json({ success: true, product });
});

// Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.params.id);
  if (!product) { return next(new ErrorHander("Product not found", 404)); }
  const images = product.images || [];

  // Deleting Images From Cloudinary
  const deletePromises = images.map((image) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(image.public_id, (error, result) => {
        if (error) { reject(error); }
        else { resolve(); }
      });
    });
  });

  await Promise.all(deletePromises);
  await Product.deleteOne({ _id: req.params.id });

  res.status(200).json({ success: true, message: "Product Delete Successfully", });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { formData } = req.body;
  const { rating, comment, productId, id, firstName, lastName } = formData;

  const review = { user: id, firstName: firstName, lastName: lastName, rating: Number(rating), comment, };
  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user && rev.user.toString() === id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => { avg += rev.rating; });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({ success: true, });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.query.id);
  if (!product) { return next(new ErrorHander("Product not found", 404)); }

  res.status(200).json({ success: true, reviews: product.reviews, });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.query.productId);
  if (!product) { return next(new ErrorHander("Product not found", 404)); }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => { avg += rev.rating; });
  let ratings = 0;

  if (reviews.length === 0) { ratings = 0; } 
  else { ratings = avg / reviews.length; }
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numOfReviews, },
    { new: true, runValidators: true, useFindAndModify: false, }
  );

  res.status(200).json({ success: true, });
});