const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: { type: String, required: true },
    brandName: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },  // New subcategory field
    productImage: [{ type: String }], // Changed to an array of strings
    description: { type: String, required: true },
    price: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    soldBy: { type: String, required: true },  // New soldBy field
    features: { type: String },  // New features field
    specifications: { type: String },  // New specifications field
}, {
    timestamps: true
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
