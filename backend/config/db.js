const mongoose = require('mongoose');
// PASSWORD = QQyMHleIsFtdzq4E
// DB_URI = mongodb+srv://shrikantj2001:QQyMHleIsFtdzq4E@cluster0.a9lke.mongodb.net/yahshuadata
async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/yml", {

        });
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;
