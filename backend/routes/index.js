const express = require('express');
const router = express.Router();
const authToken = require('../middleware/authToken');
const otpController = require('../controller/user/otpController');

router.post('/send-otp', otpController.sendOtpController);
router.post('/verify-otp', otpController.verifyOtpController);

router.post('/kyc', require('../controller/user/kycController').upload, require('../controller/user/kycController').handleKYC);


// User and Order Routes
router.put('/orders/:orderId', require("../controller/user/updateDeliveryController"));
router.post("/signup", require("../controller/user/userSignUp"));
router.post("/signin", require('../controller/user/userSignIn'));
router.get("/user-details", authToken, require('../controller/user/userDetails'));
router.get("/userLogout", require('../controller/user/userLogout'));
router.post('/user-details', authToken, require('../controller/user/uploadAddress'));

// Dashboard Route
router.get('/dashboard', require("../controller/user/orderController"));

// Admin Panel Routes
router.get("/all-user", authToken, require('../controller/user/allUsers'));
router.post("/update-user", authToken, require('../controller/user/updateUser'));
router.delete("/delete-user/:userId", authToken, require('../controller/user/deleteUser'));

// Product Routes
router.post("/upload-product", authToken, require('../controller/product/uploadProduct'));
router.get("/get-product", require('../controller/product/getProduct'));
router.post("/update-product", authToken, require('../controller/product/updateProduct'));
router.delete("/delete-product", authToken, require('../controller/product/deleteProduct'));
router.get("/get-categoryProduct", require('../controller/product/getCategoryProductOne'));
router.post("/category-product", require('../controller/product/getCategoryWiseProduct'));
router.post("/product-details", require('../controller/product/getProductDetails'));
router.get("/search", require('../controller/product/searchProduct'));
router.post("/filter-product", require('../controller/product/filterProduct'));
router.post("/popularity", require('../controller/product/popularity'));

// User Cart Routes
router.post("/addtocart", authToken, require('../controller/user/addToCartController'));
router.get("/countAddToCartProduct", authToken, require('../controller/user/countAddToCartProduct'));
router.get("/view-card-product", authToken, require('../controller/user/addToCartViewProduct'));
router.post("/update-cart-product", authToken, require('../controller/user/updateAddToCartProduct'));
router.post("/delete-cart-product", authToken, require('../controller/user/deleteAddToCartProduct'));

module.exports = router;
