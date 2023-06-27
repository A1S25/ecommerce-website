const ErrorHander = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncErrors");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

    // to extract token from cookie
    const { token } = req.cookies;

    // to check if token variable has value or not
    if (!token) { return next(new ErrorHander("Please Login to access this resource", 401)); }

    // now extract the datas from token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    //now find the user from the list according to ( decoded data id property ) we get from token
    req.user = await User.findById(decodedData.id);

    next();
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next( new ErrorHander( `Role: ${req.user.role} is not allowed to access this resouce `, 403 ) );
        }
    }
    next();
};