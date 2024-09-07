const KYC = require('../../models/kyc'); // Import the KYC model

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
      passbookFile: req.files['passbookFile'] ? req.files['passbookFile'][0].path : null
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

module.exports = {
  handleKYC
};
