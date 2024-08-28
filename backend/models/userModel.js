const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zip: String
});

const refferalSchema = new mongoose.Schema({
    refferalcode: String,
    refferredbycode: String,
    myrefferals: [
        {
            userId:{type:mongoose.Schema.Types.ObjectId, ref: 'user'},
            order_id: { type:mongoose.Schema.Types.ObjectId, ref: 'Order' },
            // name:{type:String}
            
        }
    ],
   
},{_id:false});

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
    refferal:refferalSchema
},{
    timestamps : true
})


const userModel =  mongoose.model("user",userSchema)


module.exports = userModel