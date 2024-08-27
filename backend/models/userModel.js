const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // existing fields
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNo: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
  },
  referralCode: { type: String, unique: true },
  referredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
