// BackendFolder > controller > payment > paymentRoutes.js
const express = require('express');
const { createOrder, handlePaymentSuccess, createOrderBuynow } = require('./PaymentController');
const router = express.Router();

router.post('/create-order', createOrder);
router.post('/payment-success', handlePaymentSuccess);
router.post('/create-order-buynow', createOrderBuynow); // New route for payment success

module.exports = router;