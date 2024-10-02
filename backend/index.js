const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const router = require('./routes'); // Correctly importing the router from Routes
const multer = require('multer');
const app = express();
const path = require('path');
const cron = require('node-cron'); // Importing node-cron
const User = require('./models/userModel');
require('dotenv').config();
const fs = require('fs');
// Ensure invoices directory exists
// const invoicesDir = path.join(__dirname, 'invoices');

// if (!fs.existsSync(invoicesDir)) {
//     fs.mkdirSync(invoicesDir, { recursive: true }); // Creates the folder if it doesn't exist
// }

// Serve static files from the invoices directory
// app.use('/invoices', express.static(invoicesDir));
// const uploads = multer({ dest: 'uploads/userProfilePics/' });
// const upload = multer({ dest: 'uploads/' });
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/invoices', express.static(path.join(__dirname, 'invoices')));

const allowedOrigins = ['http://18.234.168.68:3000', 'http://ymlmart.com','http://18.234.168.68'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


app.use("/api", router); // Mounting the router correctly on the '/api' pat

app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

const PORT = process.env.PORT || 8080;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log(`Server is running on port ${PORT}`);
    });

    
    cron.schedule('0 0 1 * *', async () => {
        try {
            await User.updateMany({}, { 'businessPrices.totalPurchase': 0 });
            console.log('Total purchase values reset to 0 for all users.');
        } catch (error) {
            console.error('Error resetting total purchases:', error);
        }
    });
    
});