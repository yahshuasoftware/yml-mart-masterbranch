const orderModel = require("../../models/order");

const orderController = async (req, res) => {
    try {

        const result = await orderModel.deleteMany({ status: "created" });

        // const orders = await orderModel.find();
        const orders = await orderModel.find()
        .populate('userId', 'name')
        .exec();
                res.json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders:', error); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
}

module.exports = orderController;
