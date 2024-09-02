const multer = require('multer');
const path = require('path');

// Set up storage options for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    // Generate a unique filename to avoid overwriting
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Initialize multer with the storage options
const upload = multer({ storage: storage });

module.exports = upload;
