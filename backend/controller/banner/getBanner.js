const BannerModel = require("../../models/bannerModel");

const getBannerController = async (req, res) => {
    try {
        const allBanners = await BannerModel.find().sort({ createdAt: -1 });

        res.json({
            message: "All banners retrieved successfully",
            success: true,
            error: false,
            data: allBanners
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || "An error occurred",
            error: true,
            success: false
        });
    }
};

module.exports = getBannerController;
