const Razorpay = require('razorpay');
const Order = require('../../models/order');
const userModel = require("../../models/userModel");
const productModel = require('../../models/productModel');
const pdf = require('html-pdf');
const path = require('path');


const razorpay = new Razorpay({
    key_id: 'rzp_test_U4XuiM2cjeWzma',
    key_secret: '2CXOAspw2Cgr0wlTz6vc0e8J',
});

const createOrder = async (req, res) => {
    const { amount, currency, receipt, userId, products, deliveryAddress } = req.body;

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
            deliveryAddress: deliveryAddress
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

        // Generate the invoice after successful payment
        const invoiceHTML = `
            <html>
                <head>
                    <style>
                        body { font-family: 'Helvetica', 'Arial', sans-serif; }
                        .invoice-box { max-width: 800px; margin: auto; padding: 30px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0, 0, 0, .15); }
                        .logo { width: 100px; height: auto; margin-bottom: 20px; }
                        .details { display: flex; justify-content: space-between; }
                        .details div { width: 49%; }
                        .customer-details, .company-details { font-size: 12px; padding: 10px; border: 1px solid #ccc; margin-bottom: 20px; }
                        table { width: 100%; line-height: inherit; text-align: left; border-collapse: collapse; }
                        table, td, th { border: 1px solid #ddd; padding: 8px; }
                        th { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    <div class="invoice-box">
                        <div style="text-align: center;">
                            <img src="path_to_logo.jpg" class="logo" alt="Company Logo">
                        </div>
                        <div class="details">
                            <div class="company-details">
                                <strong>Company Name:</strong> Yahshua Marketing Limited<br>
                                <strong>Email:</strong> infoymlmart@gmail.com<br>
                                <strong>Phone:</strong> +91-8888888888<br>
                                <strong>CIN:</strong> U74999MH2019PLC322063<br>
                                <strong>Website:</strong> www.ymlmart.com<br>
                                <strong>Reg. Address:</strong> HAL, OPP. HAL GAON BUS STOP, NEAR RELIANCE FUEL PUMP, OLD MUMBAI-PUNE HIGHWAY, KHOPOLI Raigarh MH 410203 IN<br>
                                <strong>Regional Office:</strong> Sr. No. 45/1/2, Office No.1, Near Shirole Maternity Hospital, Sairung Samruddhi Society, Marunji, Mulshi, Pune, Maharashtra, India, 411057
                            </div>
                            <div class="customer-details">
                                <strong>Customer Name:</strong> ${order.userId.name}<br>
                                <strong>Email:</strong> ${order.userId.email}<br>
                                <strong>Phone:</strong> ${order.userId.mobileNo}<br>
                                <strong>Delivery Address:</strong> ${JSON.stringify(order.deliveryAddress)}
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${order.products.map(product => `
                                    <tr>
                                        <td>${product.name}</td>
                                        <td>${product.quantity}</td>
                                        <td>${product.price}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        <div style="text-align: right; margin-top: 20px;">
                            <strong>Total Amount:</strong> ${order.amount} ${order.currency}
                        </div>
                    </div>
                </body>
            </html>
        `;

        // Generate PDF
        const invoicesDir = path.join(__dirname, '../..', 'invoices');

// PDF generation logic
pdf.create(invoiceHTML).toFile(path.join(invoicesDir, `invoice_${order._id}.pdf`), async (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Error generating invoice", error: err });
            }

            // Update the order with the invoice path
            // console.log(result.filename)
            const relativePath = `/invoices/invoice_${order._id}.pdf`;
            order.invoicePath = relativePath;  // Save this relative path
            await order.save();  // Save the order with the invoicePath
            // Handle referral system (if applicable)
            const user = await userModel.findById(userId);
            if (user && user.refferal.refferredbycode) {
                const referrer = await userModel.findOne({ 'refferal.refferalcode': user.refferal.refferredbycode });
                if (referrer) {
                    referrer.refferal.myrefferalorders.push({
                        'userId': user._id,
                        "order_id": order._id,
                    });
                    await referrer.save();
                }
            }

            res.status(200).json({ success: true, message: "Payment successful, order updated, invoice generated", invoicePath: result.filename });
        });
    } catch (error) {
        console.error("Error updating order after payment", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

module.exports = { createOrder, handlePaymentSuccess };
