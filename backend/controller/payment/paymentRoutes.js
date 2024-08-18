const express = require('express');
const { createOrder } = require('./PaymentController');
const router = express.Router();

router.post('/order', createOrder);

module.exports = router;
