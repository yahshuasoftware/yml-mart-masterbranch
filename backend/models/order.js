// BackendFolder > models > Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_id: { type: String, required: true },
    payment_id: { type: String },
    signature: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    receipt: { type: String, required: true },
    status: { type: String, default: 'created' }, // 'created', 'paid', 'failed'
    createdAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' }, // Assuming you have a User model
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
