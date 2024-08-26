const express = require('express');
const router = express.Router();
const userModel = require('../../models/userModel');
const orderModel = require('../../models/orderModel'); // Import your order model

async function userProfileController(req, res) {
    try {
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Aggregate total purchasing
        const totalPurchasing = await orderModel.aggregate([
            { $match: { user: req.userId, status: 'paid' } }, // Match orders with 'paid' status
            { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
        ]);

        res.status(200).json({
            success: true,
            data: {
                user,
                totalPurchasing: totalPurchasing[0] ? totalPurchasing[0].totalAmount : 0
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Server error",
        });
    }
}

module.exports = userProfileController;
