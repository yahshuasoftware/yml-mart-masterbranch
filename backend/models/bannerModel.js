const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    productImage: [String], // Define the type of the productImage array
}, {
    timestamps: true
});

const BannerModel = mongoose.model("Banner", bannerSchema);

module.exports = BannerModel;
