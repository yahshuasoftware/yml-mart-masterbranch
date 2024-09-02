const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
  panNumber: {
    type: String,
    required: true
  },
  panName: {
    type: String,
    required: true
  },
  panCardFile: {
    type: String, // This will store the path to the uploaded file
    required: false
  },
  aadharNumber: {
    type: String,
    required: true
  },
  aadharName: {
    type: String,
    required: true
  },
  aadharFile: {
    type: String, // This will store the path to the uploaded file
    required: false
  },
  accountHolderName: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String, // Use String to store large numbers
    required: true
  },
  ifscCode: {
    type: String,
    required: true
  },
  passbookFile: {
    type: String, // This will store the path to the uploaded file
    required: false
  },
  nomineeName: {
    type: String,
    required: true
  },
  nomineeRelation: {
    type: String,
    required: true
  },
  nomineeMobile: {
    type: String,
    required: true
  },
  nomineeEmail: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const KYC = mongoose.model('KYC', kycSchema);

module.exports = KYC;
