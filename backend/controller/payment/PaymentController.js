const Razorpay = require('razorpay');
const Order = require('../../models/order');
const userModel = require("../../models/userModel");
const productModel = require('../../models/productModel');
const moment = require('moment-timezone');




const razorpay = new Razorpay({
    key_id: 'rzp_test_U4XuiM2cjeWzma',
    key_secret: '2CXOAspw2Cgr0wlTz6vc0e8J',
});



const createOrder = async (req, res) => {
    const { amount, currency, receipt, userId, products, deliveryAddress } = req.body;
    const currentISTDate = moment.tz(Date.now(), 'Asia/Kolkata').toDate();


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
            })),
            amount: order.amount / 100,
            currency: order.currency,
            receipt: order.receipt,
            userId: userId,
            deliveryAddress: deliveryAddress,
            createdAt: currentISTDate // Store the date in IST

        });
        
        await newOrder.save();
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Error creating Razorpay order", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

const handlePaymentSuccess = async (req, res) => {
    const { order_id, payment_id, signature, userId } = req.body;

    try {
        // Find the existing order by order_id
        const order = await Order.findOne({ order_id })
            .populate('userId');

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Update the order with payment details
        order.payment_id = payment_id;
        order.signature = signature;
        order.status = 'paid';

        // Update product quantities in the Product schema
        for (const item of order.products) {
            await userModel.findByIdAndUpdate(order.userId._id, { 
                $inc: { "businessPrices.myPurchase": order.amount } 
            });

            const product = await productModel.findById(item.productId);
            if (product) {
                if (product.quantity >= item.quantity) {
                    product.quantity -= item.quantity; // Reduce product quantity
                    product.purchaseCount = (product.purchaseCount || 0) + item.quantity; // Update purchase count
                    await product.save();
                } else {
                    return res.status(400).json({
                        success: false,
                        message: `Not enough stock for product: ${product.productName}`,
                    });
                }
            }
        }

        // Save the updated order
        await order.save();

        // Handle referral system (if applicable)
        const user = await userModel.findById(userId);
        if (user && user.refferal.refferredbycode) {
            const referrer = await userModel.findOne({ 'refferal.refferalcode': user.refferal.refferredbycode });
            if (referrer) {
                // Increment totalPurchase and calculate 5% incentive
                const totalIncentive = 0.05 * order.amount;

                referrer.businessPrices.totalPurchase += order.amount; // Update totalPurchase
                referrer.businessPrices.totalIncentive += totalIncentive; // Update totalIncentive
                referrer.refferal.myrefferalorders.push({
                    userId: user._id,
                    order_id: order._id,
                });

                await referrer.save(); // Save the updated referrer details
            }
        }

        res.status(200).json({ success: true, message: "Payment successful, order updated" });
    } catch (error) {
        console.error("Error updating order after payment", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

module.exports = { createOrder, handlePaymentSuccess };
