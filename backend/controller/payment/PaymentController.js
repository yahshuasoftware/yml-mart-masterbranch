const Razorpay = require('razorpay');
const Order = require('../../models/order'); // Import the Order model
const userModel = require("../../models/userModel")

const razorpay = new Razorpay({
    key_id: 'rzp_test_U4XuiM2cjeWzma',
    key_secret: '2CXOAspw2Cgr0wlTz6vc0e8J',
});

const createOrder = async (req, res) => {
    const { amount, currency, receipt, userId, products,order_id, deliveryAddress } = req.body;

    try {
        const options = {
            amount: amount * 100, // Amount in paisa (multiply by 100)
            currency: currency || "INR",
            receipt: receipt || `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        // Save a preliminary order to the database with status 'created'
        const newOrder = new Order({
            order_id: order.id,
            products: products.map(product => ({
                productId: product.productId._id,
                name: product.productId.productName,
                quantity: product.quantity,
                price: product.productId.sellingPrice,
                image: product.productId.productImage,
                commissionPrice: product.productId.commissionPrice * product.quantity
            })),
            amount: order.amount / 100,
            currency: order.currency,
            receipt: order.receipt,
            userId: userId,
            deliveryAddress : deliveryAddress
        });
        
        await newOrder.save();

        
        

        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Error creating Razorpay order", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

const createOrderBuynow = async (req, res) => {
    const { amount, currency, receipt, userId, products } = req.body;

    try {
        const options = {
            amount: amount , // Amount in paisa (multiply by 100)
            currency: currency || "INR",
            receipt: receipt || `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        // Check if `products` is an array or a single object
        const formattedProducts = Array.isArray(products) ? products : [products];

        // Save a preliminary order to the database with status 'created'
        const newOrder = new Order({
            order_id: order.id,
            products: formattedProducts.map(product => ({
                productId: product._id,
                name: product.productName,
                quantity: product.quantity || 1, // Default quantity to 1 if not provided
                price: product.sellingPrice,
                image: product.productImage[0], // Assuming you want the first image if there are multiple
                commissionPrice: (product.commissionPrice || 0) * (product.quantity || 1)
            })),
            amount: order.amount ,
            currency: order.currency,
            receipt: order.receipt,
            userId: userId,
        });
        
        await newOrder.save();

        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Error creating Razorpay order", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

const handlePaymentSuccess = async (req, res) => {
    const { order_id, payment_id, signature,userId } = req.body;

    try {
        // Find the existing order by order_id
        const order = await Order.findOne({ order_id });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Update the order with payment details
        order.payment_id = payment_id;
        order.signature = signature;
        order.status = 'paid';


       
       


        await order.save();

        const user = await userModel.findById(userId);
        console.log(user);

        if (user && user.refferal.refferredbycode) {
            // Find the referrer using the referred by code
            const referrer = await userModel.findOne({ 'refferal.refferalcode': user.refferal.refferredbycode });
            console.log(referrer);
            if (referrer) {
                // Add the order details to the referrer's myrefferals array
                // referrer.refferal.myrefferals.push({});
                referrer.refferal.myrefferalorders.push({
                    'userId':user._id,
                    // 'name':user.name,
                    "order_id": order._id
                    

                });

                // Save the referrer with the updated myrefferals array
                await referrer.save();
            }
        }

        

        res.status(200).json({ success: true, message: "Payment successful, order updated" });
    } catch (error) {
        console.error("Error updating order after payment", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

module.exports = { createOrder, createOrderBuynow, handlePaymentSuccess };
