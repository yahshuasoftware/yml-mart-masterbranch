const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');


async function userSignUpController(req,res){
    try{
        const { email, password, name,refferredbycode} = req.body

        const user = await userModel.findOne({email})

        console.log("user",user)

        if(user){
            throw new Error("Already user exits.")
        }

        if(!email){
           throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!name){
            throw new Error("Please provide name")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something is wrong")
        }

        function generateReferralCode() {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const numbers = '0123456789';
            let code = '';
          
            for (let i = 0; i < 3; i++) {
              code += letters.charAt(Math.floor(Math.random() * letters.length));
            }
            for (let i = 0; i < 3; i++) {
              code += numbers.charAt(Math.floor(Math.random() * numbers.length));
            }
          
            return code;
          }
        const referralCode = generateReferralCode();
        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPassword,
            refferal: {
                refferalcode: referralCode,   // Generate or set a referral code
                refferredbycode  // Include the referredbycode from the request
            }
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "User created Successfully!"
        })


    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}

module.exports = userSignUpController