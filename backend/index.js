require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const router = require('./routes'); // Correctly importing the router from Routes
const multer = require('multer');
const path = require('path');
const cron = require('node-cron'); // Make sure you're importing cron
const User = require('./models/userModel'); // Import the User model

const app = express();

// Schedule the job to run every minute (for debugging)
// const resetTotalPurchasingJob = () => {
//   // Schedule the job to run every minute
//   cron.schedule('* * * * *', async () => {
//     try {
//       // Update the 'totalPurchase' field inside the 'businessPrices' object for all users
//       const result = await User.updateMany(
//         {}, // Apply this to all users
//         { $set: { 'businessPrices.totalPurchase': 0 } }, // Reset totalPurchase to 0
//         { multi: true } // Update multiple documents
//       );
      
//       console.log(`Total purchases reset for ${result.nModified} users.`);
      
//     } catch (err) {
//       console.error('Error resetting total purchases:', err);
//     }
//   });
// };

// // Start the cron job
// resetTotalPurchasingJob();


// Middleware and routes setup
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api", router); // Mounting the router correctly on the '/api' path

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to DB");
    console.log(`Server is running on port ${PORT}`);
  });
});
