const uploadProductPermission = require("../../helpers/permission");
const BannerModel = require("../../models/bannerModel");

async function UploadBannerController(req, res) {
    try {
        const sessionUserId = req.userId;

        if (!uploadProductPermission(sessionUserId)) {
            return res.status(403).json({
                message: "Permission denied",
                error: true,
                success: false
            });
        }

        if (!req.body.productImage || !Array.isArray(req.body.productImage)) {
            return res.status(400).json({
                message: "Invalid productImage data",
                error: true,
                success: false
            });
        }

        const uploadBanner = new BannerModel(req.body);
        const savedBanner = await uploadBanner.save();

        res.status(201).json({
            message: "Banner uploaded successfully",
            error: false,
            success: true,
            data: savedBanner
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || "An error occurred",
            error: true,
            success: false
        });
    }
}

module.exports = UploadBannerController;
