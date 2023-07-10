const nodemailer = require("nodemailer");
const logger = require("./logger");
const CONFIG = require("./ dotenv");
//const { ServiceBusClient } = require("@azure/service-bus");
//const azureNotificationModel = require("../models/azureNotifications");

if (
    CONFIG.EMAIL_USRNAME == undefined ||
    CONFIG.EMAIL_USRNAME == "" ||
    CONFIG.EMAIL_USRNAME == undefined ||
    CONFIG.EMAIL_USRNAME == ""
  ) {
    console.log(CONFIG.EMAIL_USRNAME,"--------------------------")
    logger.error("Email UserName not found in environment");
    process.exit(1);
} else if (CONFIG.EMAIL_CLIENTID == undefined) {
  logger.error("Email Client ID not found in environment");
  process.exit(1);
} else if (CONFIG.EMAIL_SECRET == undefined) {
  logger.error("Email secret is not found in environment");
  process.exit(1);
} else if (CONFIG.EMAIL_REFRESH_TOKEN == undefined) {
  logger.error("Email refresh token not found in environment");
  process.exit(1);
} else if (CONFIG.EMAIL_ACCESS_TOKEN == undefined) {
  logger.error("Email Access token not found in environment");
  process.exit(1);
}
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: CONFIG.EMAIL_USRNAME,
      clientId:CONFIG.EMAIL_CLIENTID,
      clientSecret: CONFIG.EMAIL_SECRET,
      refreshToken: CONFIG.EMAIL_REFRESH_TOKEN,
      accessToken:CONFIG.EMAIL_ACCESS_TOKEN,
    },
  });

async function sendEmail(email, firstName, lastName) {
    console.log(email,"send email fun")
    try {
      console.log(email,"try emailid");
      return await transporter.sendMail({
        from: CONFIG.EMAIL_USRNAME,
        to: email,
        subject: "Approval confirmation Mail",
        text:
          "Hi " +
          firstName +
          " " +
          lastName +
          ", Your Tele-Medicine appointment is booked successfully on " 
      });
      
    
    } catch (err) {
      logger.error("Error: " + err);
      throw err;
    }
  }
  async function registerEmailVerfication (email,firstName,lastName,token){
    try{
        let ip= `0.0.0.0`;
       let port=8002;
       //let Token = "Bearer " + token.trim();
       //console.log(Token,"token ")
       //console.log(Token,"register token")
      return await transporter.sendMail({
        from: CONFIG.EMAIL_USRNAME,
        to:email,
        subject: "Register Verficatin ",
        text:
          "Hi " +
          firstName +
          " " +
          lastName ,
          html: `
          <a href="http://${ip}:${port}/verifyAccount?token=${token}">
            <button style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; cursor: pointer;">
             Verify Account
            </button>
          </a>
        `
      });
    }
    catch (err) {
      logger.error("Error: " + err);
      throw err;
    }
    
  }
  async function sendLoginotp(email,otp){
    try {
      return await transporter.sendMail({
        from: CONFIG.EMAIL_USRNAME,
        to: email,
        subject: "Login Verification OTP",
        text:
         "your otp is :"+otp 
      });
      
    
    } catch (err) {
      logger.error("Error: " + err);
      throw err;
    }
  }
  exports.emailService={
    sendEmail:sendEmail,
    registerEmailVerfication:registerEmailVerfication,
    sendLoginotp:sendLoginotp
  }