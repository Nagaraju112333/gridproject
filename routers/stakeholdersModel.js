const routes=(module.exports=require("express")())
const { verify } = require("jsonwebtoken");
const {allStackholderFunctions}=require("../services/stakeholdersModel");
//const { token } = require("morgan");-
const jwt=require("jsonwebtoken");
const verifyOtpModel = require("../models/otpModel");
const {verifyotpfunctions}=require("../services/stakeholdersModel")
routes.post("/stakeholderREgister",async(req,res)=>{
    
    try{
           const data=await allStackholderFunctions.fcnstackholderRegister(req.body);
           res.send(data);
    }
    catch(err){
    res.send(err)
    }

})
routes.get("/verifyAccount",async (req,res)=>{
    try{
        let decode=jwt.verify(req.query.token,routes.get("secret")|| 'default-secret-key');
        let id =decode.id
        let verifyAccount=await allStackholderFunctions.fcnVerifyAccount(id);
        res.send(verifyAccount);
    }
    catch(err){
    return err
    }
})
routes.post("/login",async (req,res)=>{
   
    try{
        let  checkEmailAndPassword=await allStackholderFunctions.fcnLogin(req.body);
        res.send(checkEmailAndPassword);
    }
    catch(err){
        res.send(err);
    }
})
routes.get("/verifyotp",async (req,res)=>{
    try{
        
        let verifyOtp=await verifyotpfunctions.fcnVerifyOtpandGetUserData(req.id,req.query.otp)
        res.send(verifyOtp)
    }
    catch(err){
        res.send(err)
    }
})