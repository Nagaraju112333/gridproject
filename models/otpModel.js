const mongoose = require("mongoose");
const con= require("../loaders/mongoose");
const newSchema=new mongoose.Schema({
    otp:{type:Number},
    userid:{type:String}
})

const verifyOtpModel=con.db1.model("verifyOtpModel",newSchema);
module.exports=verifyOtpModel;