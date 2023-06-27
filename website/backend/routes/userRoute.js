const express = require("express");
const router = express.Router();
const { registerUsers ,registerUser, loginUser, forgotPassword, resetPassword, getUserDetails, getAllUser, deleteUser, getSingleUser, updateUserRole, updatePassword, updateProfile, logout } = require("../controller/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const multer = require('multer');
// Configure multer storage
const storage = multer.memoryStorage(); // Store the file in memory as Buffer
const upload = multer({ storage });

router.route("/register").post(upload.single('image'), registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/forget").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/admin/users").get(getAllUser);
router.route("/admin/user/:id")
    .get(getSingleUser)
    .put(updateUserRole)
    .delete(deleteUser);
router.route("/password/update").put(updatePassword);
router.route("/me/update").put(upload.single('image'), updateProfile);
router.route("/logout").get(logout);

module.exports = router;

