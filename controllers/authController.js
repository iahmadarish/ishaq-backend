const User = require('../models/User');
const Verification = require('../models/Verification');
const { generateOTP } = require('../utils/otpService');
const { sendOTPEmail } = require('../utils/emailService');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Generate OTP
    const otp = generateOTP();

    // Save verification details
    const verification = new Verification({
      email,
      otp: await bcrypt.hash(otp, 10),
      purpose: 'REGISTRATION'
    });
    await verification.save();

    // Send OTP via email
    await sendOTPEmail(email, otp, 'REGISTRATION');

    res.status(200).json({ 
      message: 'OTP sent for verification', 
      email 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyRegistration = async (req, res) => {
  try {
    const { email, otp, username, password } = req.body;

    // Find verification record
    const verification = await Verification.findOne({ 
      email, 
      purpose: 'REGISTRATION' 
    });

    if (!verification) {
      return res.status(400).json({ message: 'Invalid verification attempt' });
    }

    // Verify OTP
    const isValidOTP = await bcrypt.compare(otp, verification.otp);
    if (!isValidOTP) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Delete verification record
    await Verification.deleteOne({ _id: verification._id });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.initiatePasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP
    const otp = generateOTP();

    // Save verification details
    const verification = new Verification({
      email,
      otp: await bcrypt.hash(otp, 10),
      purpose: 'PASSWORD_RESET'
    });
    await verification.save();

    // Send OTP via email
    await sendOTPEmail(email, otp, 'PASSWORD_RESET');

    res.status(200).json({ 
      message: 'Password reset OTP sent', 
      email 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Find verification record
    const verification = await Verification.findOne({ 
      email, 
      purpose: 'PASSWORD_RESET' 
    });

    if (!verification) {
      return res.status(400).json({ message: 'Invalid password reset attempt' });
    }

    // Verify OTP
    const isValidOTP = await bcrypt.compare(otp, verification.otp);
    if (!isValidOTP) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Update user password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    // Delete verification record
    await Verification.deleteOne({ _id: verification._id });

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
