const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

function generateReferralCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let result = '';
    for (let i = 0; i < 3; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 3; i++) {
        result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return result;
}

async function userSignUpController(req,res){
    try{
        const { email, password, name} = req.body

        // Check for existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists.");
        }

        // Validate required fields
        if (!email) {
            throw new Error("Please provide an email.");
        }
        if (!password) {
            throw new Error("Please provide a password.");
        }
        if (!name) {
            throw new Error("Please provide a name.");
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        // Generate referral code
        const generatedReferralCode = generateReferralCode();

        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPassword
        }

        // Create and save the new user
        const newUser = new userModel(payload);
        const savedUser = await newUser.save();

        // If a referral code is provided, update the referrer’s record
        if (referralCode) {
            const referrer = await userModel.findOne({ referralCode });
            if (referrer) {
                await userModel.updateOne(
                    { _id: referrer._id },
                    { $push: { referredUsers: savedUser._id } } // Add the new user to the referrer’s referredUsers list
                );
            }
        }

        // Respond with the created user data
        res.status(201).json({
            data: savedUser,
            success: true,
            error: false,
            message: "User created successfully!"
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;
