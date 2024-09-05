const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
  panNumber: { type: String, required: true },
  panName: { type: String, required: true },
  panCardFile: { type: String, required: false },
  aadharNumber: { type: String, required: true },
  aadharName: { type: String, required: true },
  aadharFile: { type: String, required: false },
  accountHolderName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifscCode: { type: String, required: true },
  passbookFile: { type: String, required: false }
});

module.exports = mongoose.model('KYC', kycSchema);
