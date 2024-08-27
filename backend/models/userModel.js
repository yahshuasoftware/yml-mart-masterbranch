const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zip: String
});

const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true,
        required : true
    },
    mobileNo: Number,
    address: addressSchema,
    password : String,
    profilePic : String,
    role : String,
},{
    timestamps : true
})


const User = mongoose.model('User', userSchema);
module.exports = User;
