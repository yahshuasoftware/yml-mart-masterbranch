const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            productName: { type: String, required: true },
            brandName: { type: String, required: true },
            category: { type: String, required: true },
            productImage: [{ type: String }],
            description: { type: String },
            price: { type: Number, required: true },
            sellingPrice: { type: Number, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    amount: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    paymentId: { type: String },
    orderId: { type: String },
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
