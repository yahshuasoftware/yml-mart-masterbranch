const Razorpay = require('razorpay');
const Order = require('../../models/order'); // Import the Order model

const razorpay = new Razorpay({
    key_id: 'rzp_test_U4XuiM2cjeWzma',
    key_secret: '2CXOAspw2Cgr0wlTz6vc0e8J',
});

const createOrder = async (req, res) => {
    const { amount, currency, receipt } = req.body;

    try {
        const options = {
            amount: amount * 100, // Amount in paisa (multiply by 100)
            currency: currency || "INR",
            receipt: receipt || `receipt_${Date.now()}`,
        };

        // Create order with Razorpay
        const order = await razorpay.orders.create(options);

        // Return the order details to the frontend
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Error creating Razorpay order", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

const handlePaymentSuccess = async (req, res) => {
    const { order_id, payment_id, signature, userId, products, amount, currency } = req.body;

    try {
        // Create a new order in your database after a successful payment
        const newOrder = new Order({
            order_id: order_id,
            payment_id: payment_id,
            signature: signature,
            products: products.map(product => ({
                productId: product.productId._id,
                name: product.productId.productName,
                quantity: product.quantity,
                price: product.productId.sellingPrice,
                image: product.productId.productImage
            })),
            amount: amount / 100,
            currency: currency || "INR",
            user: userId,
            status: 'paid', 
        });

        await newOrder.save();

        res.status(200).json({ success: true, message: "Payment successful, order stored in the database." });
    } catch (error) {
        console.error("Error saving order after payment", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

module.exports = { createOrder, handlePaymentSuccess };
