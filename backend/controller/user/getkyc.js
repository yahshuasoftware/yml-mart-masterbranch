const KYC = require('../../models/kyc'); // Import the KYC model

// Controller function for handling KYC data and file uploads (POST method)
const getkyc = async (req, res) => {
  try {
    const userId = req.params; // Assuming userId is sent in the request body

    // Check if KYC details for the user already exist
    const existingKYC = await KYC.findOne({ userId });

    if (existingKYC) {
      return res.status(400).json({
        success: false,
        message: 'KYC details already exist for this user.',
      });
    }


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
  getkyc,
};