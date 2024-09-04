const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// In-memory store for OTPs
const otpStore = {};

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Function to send OTP
const sendOtpController = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP in the in-memory store with an expiration time of 5 minutes
    otpStore[email] = { otp, expires: Date.now() + 300000 }; // 5 minutes

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, message: 'An error occurred while sending OTP' });
    }
};

// Function to verify OTP
const verifyOtpController = (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    const storedOtp = otpStore[email];

    if (!storedOtp) {
        return res.status(400).json({ success: false, message: 'No OTP found for this email' });
    }

    if (Date.now() > storedOtp.expires) {
        return res.status(400).json({ success: false, message: 'OTP has expired' });
    }

    if (storedOtp.otp !== otp) {
        return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // OTP is valid, generate a JWT token for the user
    const token = jwt.sign({ email }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });

    // Clear OTP from store after verification
    delete otpStore[email];

    res.status(200).json({ success: true, message: 'OTP verified successfully', token });
};

module.exports = { sendOtpController, verifyOtpController };
