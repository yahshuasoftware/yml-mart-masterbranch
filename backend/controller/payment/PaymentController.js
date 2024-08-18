const Razorpay = require('razorpay');

// Import keys from environment variables or your config file
const razorpay = new Razorpay({
    key_id: 'rzp_test_U4XuiM2cjeWzma',
    key_secret: '2CXOAspw2Cgr0wlTz6vc0e8J',
});

// Create an order
const createOrder = async (req, res) => {
    const { amount, currency, receipt } = req.body;

    try {
        const options = {
            amount: amount * 100, // Amount in paisa (multiply by 100)
            currency: currency || "INR",
            receipt: receipt || `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Error creating Razorpay order", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

module.exports = { createOrder };
