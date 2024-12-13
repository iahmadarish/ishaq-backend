const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true 
  },
  otp: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now, 
    expires: 600 // OTP expires in 10 minutes
  },
  purpose: {
    type: String, 
    enum: ['REGISTRATION', 'PASSWORD_RESET'], 
    required: true
  }
});

module.exports = mongoose.model('Verification', verificationSchema);