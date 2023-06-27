const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcryptjs");


// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

  if (!req.file) { return res.status(400).json({ success: false, message: 'No file uploaded' }); }
  // Process the file upload
  const uploadOptions = { folder: 'products', public_id: `image_${Date.now()}`, resource_type: 'auto', };
  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) { reject(error); }
      else { resolve(result); }
    }).end(req.file.buffer);
  });

  const { firstName, lastName, email, phoneNumber, password } = req.body;
  const users = await User.findOne({ email });

  if (users) { return res.json({ errors: [{ msg: "Email already in use", },], data: null, }); };
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ firstName, lastName, email, phoneNumber, password: hashedPassword,
    image: { url: uploadResult.secure_url, public_id: uploadResult.public_id }, });

  sendToken(user, 201, res);
});


// Login User x
exports.loginUser = catchAsyncErrors(async (req, res, next) => {

  const { email, password } = req.body;
  if (!email || !password) { return next(new ErrorHandler("Please Enter Email & Password", 400)); }

  const user = await User.findOne({ email }).select("+password");
  if (!user) { return next(new ErrorHandler("Invalid email or password", 401)); }

  sendToken(user, 200, res);
});

// Forgot Password x
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findOne({ email: req.body.email });
  if (!user) { return next(new ErrorHandler("User not found", 404)); }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://localhost:3000/password/reset/${resetToken}`;
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({ email: user.email, subject: `Ecommerce Password Recovery`, message, });
    res.status(200).json({ success: true, message: `Email sent to ${user.email} successfully`, });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() }, });

  if (!user) {
    return next( new ErrorHandler( "Reset Password Token is invalid or has been expired", 400 ) );
  }

  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) { 
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, user, });
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, users, });
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) { return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)); }

  await user.deleteOne();
  res.status(200).json({ success: true, message: "User Deleted Successfully", });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.params.id);
  if (!user) {
    return next( new ErrorHandler(`User does not exist with Id: ${req.params.id}`) );
  }

  res.status(200).json({ success: true, user, });
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = { firstName: req.body.firstName, lastName: req.body.lastName,
    email: req.body.email, role: req.body.role, };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true, runValidators: true, useFindAndModify: false, });

  res.status(200).json({ success: true, });
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

  const { formData, id } = req.body;
  const { oldPassword, newPassword, confirmPassword } = formData;
  const user = await User.findById(id).select("+password");

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = newPassword;
  await user.save();
  sendToken(user, 200, res);
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

  if (!req.file) { return res.status(400).json({ success: false, message: 'No files uploaded' }); }
  const file = req.file;
  const { id, firstName, lastName, email } = req.body;
  const newUserData = { firstName: firstName, lastName: lastName, email: email, };

  if (file !== "") {
    const user = await User.findById(id);
    const imageId = user.image[0].public_id.toString();
  }

  const user = await User.findByIdAndUpdate(id, newUserData, { new: true, runValidators: true, useFindAndModify: false, });
  res.status(200).json({ success: true, });
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true, });
  res.status(200).json({ success: true, message: "Logged Out", });
});