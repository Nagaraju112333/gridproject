//const { default: stakeholders } = require("razorpay/dist/types/stakeholders");
const stakeholders=require("../models/stakeholdersModel");
const {emailService}=require("../loaders/email")
const {hasher}=require("../lib/hasher");
const _ = require('lodash');
const generateToken=require("../lib/generateToken"); 
const { tokensToRegExp } = require("path-to-regexp");
//const { contentSecurityPolicy } = require("helmet");
const verifyOtpModel=require("../models/otpModel");

async function fcnstackholderRegister(data){

    try{
      const checkEmailExsists=await stakeholders.findOne({emailID:data.emailID});
      //console.log(checkEmailExsists,"===================")
       if(checkEmailExsists==null){
         let savedData=await  new stakeholders({
            role:data.role,
            emailID:data.emailID,
            password:await hasher.passwordHasher(data.password),
            firstName:data.firstName,
            lastName:data.lastName,
            phoneNumber:data.phoneNumber,
            address:data.address,
            profilePic:data.profilePic,
            dob:data.dob,
            gender:data.gender
         })
         
         await savedData.save();
         let token = await generateToken(
          savedData._id,
          //checkUserExist.designation
        );
        let registerverificartionlink= emailService.registerEmailVerfication(data.emailID,data.firstName,data.lastName,token);
        // return {
        //   token: token,
        //   user: await _.pick(savedData, [
        //     "_id"
        //   ]),
        // };
         return {message:"Regitser successfully done verification link send to your emailId:"+data.emailID}
       }
       else{
          return ({message:"email already exsist"})
       }
    }
    catch(err){
      return err
    }
}
async function fcnVerifyAccount(id){
 // console.log(token.param.id,"link token")
  try{
    //let verifyAccount=await stakeholders.findOne({_id:id});
    if(id!=null){
      let activeAccount=await stakeholders.updateOne({_id:id},{$set:{emailVerified:true}});

      return ({message:"verify account successfully done"})
    }
  }
  catch(err){
    return err
  }
}
async function fcnLogin(data){
  
  try{
      //let randamotp=Math.floor((Math.random()*1000000)+1);
      let randamotp=123456;
      let checkemail=await stakeholders.findOne({emailID:data.emailID});
      if(checkemail!=null){
          if(checkemail.emailVerified==true){
            if (
              await hasher.comparePassword(data.password, checkemail.password)
            ){
              let token = await generateToken(
                checkemail._id,
                checkemail.role,
                checkemail.emailID
                //checkUserExist.designation
               
              );
              console.log(randamotp,"otp")
              emailService.sendLoginotp(checkemail.emailID,randamotp);
               let saveopt=await new verifyOtpModel({
                otp:randamotp,
                userid:checkemail._id
                
               })
               await saveopt.save();
              return{
                token:token,
                message:"login verify otp sent to your register EmailId:"+checkemail.emailID
              }
            }
          }
          else{
            return ({message:"please verify account"})
          }
      }
      else{
        return ({message:"account not found with:"+data.emailID})
      }

  }
  catch(err){
    return err
  }
}
async function fcnVerifyOtpandGetUserData(id,otp,role){
  try{
     let verityotp=await verifyOtpModel.findOne({otp:otp,userid:id});
     if(verityotp!=null){
        let deleteOtp=await verifyOtpModel.deleteOne({otp:otp,userid:id});
        return ({message:"otp verify successfully done"})
     }
     else{
       return ({message:"invalid otp"})
     }
  }
  catch(err){
    return err
  }
}
exports.allStackholderFunctions={
    fcnstackholderRegister:fcnstackholderRegister,
    fcnVerifyAccount:fcnVerifyAccount,
    fcnLogin:fcnLogin,
   
}
exports.verifyotpfunctions={
  fcnVerifyOtpandGetUserData:fcnVerifyOtpandGetUserData
}