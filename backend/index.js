require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const router = require('./routes'); // Correctly importing the router from Routes
const multer = require('multer');
const app = express();
const path = require('path');


const fs = require('fs');
// Ensure invoices directory exists
const invoicesDir = path.join(__dirname, 'invoices');

if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir, { recursive: true }); // Creates the folder if it doesn't exist
}

// Serve static files from the invoices directory
app.use('/invoices', express.static(invoicesDir));
// const uploads = multer({ dest: 'uploads/userProfilePics/' });
const upload = multer({ dest: 'uploads/' });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/invoices', express.static(path.join(__dirname, 'invoices')));


app.use(cors({
    origin: ['http://localhost:3000'],
    // origin: ['http://3.85.148.197'],
    credentials: true,
}));
// app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", router); // Mounting the router correctly on the '/api' pat


const PORT = process.env.PORT || 8080;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log(`Server is running on port ${PORT}`);
    });
});
