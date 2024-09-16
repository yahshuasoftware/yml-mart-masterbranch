const multer = require('multer');
const path = require('path');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory to save uploaded files
    cb(null, 'uploads/productImages');
  },
  filename: (req, file, cb) => {
    // Define the file name to be saved
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Create multer instance with storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
