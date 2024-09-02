const multer = require('multer');
const path = require('path');
const KYC = require('../../models/kyc'); // Import the KYC model

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).fields([
  { name: 'panCardFile', maxCount: 1 },
  { name: 'aadharFile', maxCount: 1 },
  { name: 'passbookFile', maxCount: 1 }
]);

// Controller function for handling KYC data and file uploads
const handleKYC = async (req, res) => {
  try {
    // Create a new KYC document
    const kycDetails = new KYC({
      panNumber: req.body.panNumber,
      panName: req.body.panName,
      panCardFile: req.files['panCardFile'] ? req.files['panCardFile'][0].path : null,
      aadharNumber: req.body.aadharNumber,
      aadharName: req.body.aadharName,
      aadharFile: req.files['aadharFile'] ? req.files['aadharFile'][0].path : null,
      accountHolderName: req.body.accountHolderName,
      accountNumber: req.body.accountNumber,
      ifscCode: req.body.ifscCode,
      passbookFile: req.files['passbookFile'] ? req.files['passbookFile'][0].path : null,
      nomineeName: req.body.nomineeName,
      nomineeRelation: req.body.nomineeRelation,
      nomineeMobile: req.body.nomineeMobile,
      nomineeEmail: req.body.nomineeEmail,
    });

    // Save the KYC document to the database
    await kycDetails.save();

    res.status(200).json({
      success: true,
      message: 'KYC details and files uploaded successfully!',
      data: kycDetails
    });
  } catch (error) {
    console.error('Error processing KYC details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload KYC details and files.',
      error: error.message
    });
  }
};

// Export the controller functions
module.exports = {
  handleKYC,
  upload
};
