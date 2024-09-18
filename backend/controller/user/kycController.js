const KYC = require('../../models/kyc'); // Import the KYC model

// Controller function for handling KYC data and file uploads (POST method)
const postKYC = async (req, res) => {
  try {
    const userId = req.body.userId; // Assuming userId is sent in the request body

    // Check if KYC details for the user already exist
    const existingKYC = await KYC.findOne({ userId });

    if (existingKYC) {
      return res.status(400).json({
        success: false,
        message: 'KYC details already exist for this user.',
      });
    }

    // Create a new KYC document
    const kycDetails = new KYC({
      userId,
      panNumber: req.body.panNumber || '', // Default to empty string if not provided
      panName: req.body.panName || '', // Default to empty string if not provided
      panCardFilePath: req.files['panCardFile'] ? req.files['panCardFile'][0].path : null,
      aadharNumber: req.body.aadharNumber || '', // Default to empty string if not provided
      aadharName: req.body.aadharName || '', // Default to empty string if not provided
      aadharFilePath: req.files['aadharFile'] ? req.files['aadharFile'][0].path : null,
      accountHolderName: req.body.accountHolderName || '', // Default to empty string if not provided
      accountNumber: req.body.accountNumber || '', // Default to empty string if not provided
      ifscCode: req.body.ifscCode || '', // Default to empty string if not provided
      passbookFilePath: req.files['passbookFile'] ? req.files['passbookFile'][0].path : null,
    });

    // Save the KYC document to the database
    await kycDetails.save();

    res.status(201).json({
      success: true,
      message: 'KYC details and files uploaded successfully!',
      data: kycDetails,
    });
  } catch (error) {
    console.error('Error processing KYC details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload KYC details and files.',
      error: error.message,
    });
  }
};

module.exports = {
  postKYC,
};