const express = require('express');
const app = express();
const Razorpay = require('razorpay');

// Middleware
app.use(express.json());

// Controllers
const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require('../controller/user/userSignIn');
const userDetailsController = require('../controller/user/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const UploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProduct = require('../controller/product/getCategoryProductOne');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCartController');
const countAddToCartProduct = require('../controller/user/countAddToCartProduct');
const addToCartViewProduct = require('../controller/user/addToCartViewProduct');
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct');
const searchProduct = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');
const profile = require('../controller/user/userProfileController');

// Payment Controller
const { createOrder } = require('../controller/payment/PaymentController');

// User Routes
app.post("/signup", userSignUpController);
app.post("/signin", userSignInController);
app.get("/user-details", authToken, userDetailsController);
app.get("/userLogout", userLogout);

// Admin Panel Routes
app.get("/all-user", authToken, allUsers);
app.post("/update-user", authToken, updateUser);

// Product Routes
app.post("/upload-product", authToken, UploadProductController);
app.get("/get-product", getProductController);
app.post("/update-product", authToken, updateProductController);
app.get("/get-categoryProduct", getCategoryProduct);
app.post("/category-product", getCategoryWiseProduct);
app.post("/product-details", getProductDetails);
app.get("/search", searchProduct);
app.post("/filter-product", filterProductController);

// User Add to Cart Routes
app.post("/addtocart", authToken, addToCartController);
app.get("/countAddToCartProduct", authToken, countAddToCartProduct);
app.get("/view-card-product", authToken, addToCartViewProduct);
app.post("/update-cart-product", authToken, updateAddToCartProduct);
app.post("/delete-cart-product", authToken, deleteAddToCartProduct);
app.get("/user-profile", authToken, profile);

// Payment Route (integrated directly into index.js)
app.post('/api/payment/create-order', createOrder);

module.exports = app;
