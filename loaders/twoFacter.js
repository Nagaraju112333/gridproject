const logger = require("../loaders/logger");
const { errorHandler } = require("../lib/responseErrorHandler");
const request = require("request-promise");
const CONFIG = require("./dotenv");
const { ServiceBusClient } = require("@azure/service-bus");
async function SMSTemplate(
  patientID,
  phoneNumber,
  templateName,
  variables,
  functionName,
  providerID
) {
  try {
    console.log(variables, "variables---------------------->");
    let notifications = new messageazure({
      patientId: patientID,
      messageStatus: "INITATED",
      variables: variables,
      templateName: templateName,
      messageType: "SMS",
      phoneNumber: phoneNumber,
      priority: "HIGH",
      queueName: process.env.QUEUENAME,
      functionName: functionName,
    });
    let dbResponse = await notifications.save();
    logger.info("triggering service bus request ------------>");
    const serviceBusClient = new ServiceBusClient(
      process.env.AZURE_CONNECTION_STRING_NOTIFICATION
    );
    const sender = serviceBusClient.createSender(process.env.QUEUENAME);
    let batch = await sender.createMessageBatch();
    batch.tryAddMessage({
      body: { id: dbResponse._id, NOTIFICATIONTYPE: "SMS" },
    });
    await sender.sendMessages(batch);
    await sender.close();
  } catch (err) {
    logger.error("Error: " + err);
    throw err;
  }
}

//* This Function is used to send OTPs
async function sendOTP(phoneNumber) {
  try {
    var options = {
      method: "GET",
      url:
        "http://2factor.in/API/V1/" +
        process.env.TWO_FACTOR_API_KEY +
        "/SMS/" +
        phoneNumber +
        "/AUTOGEN",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      form: {},
    };
    let response = await request(options);
    let result = await JSON.parse(response);
    console.log(result,"resultdata")
    logger.debug(result, "/////RESULT///");
    return result;
    
  } catch (err) {
    logger.error(err.toString());
    let parseErr = await JSON.parse(err.error);
    if (parseErr.Status == "Error") {
      await errorHandler.fcnCustomError(404, "Invalid Phone Number");
    }
  }
}

//* This Function is used to verify the OTPs
async function verifyOTP(sid, code) {
  console.log(sid,"sid in verifyfunctions")
  try {
    // console.log("*****");
    var options = {
      method: "GET",
      url:
        "https://2factor.in/API/V1/" +
        process.env.TWO_FACTOR_API_KEY +
        "/SMS/VERIFY/" +
        sid +
        "/" +
        code,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      form: {},
    };
    let response = await request(options);
    console.log(response,"response")
    console.log(options,"options")
    let result = await JSON.parse(response);
    logger.debug(result, "/////RESULT///");
    return result;
  } catch (err) {
    // console.log("/*/*/*/*/*/*/");
    let parseErr = await JSON.parse(err.error);
    console.log(parseErr,"eerrrrrr")
    if (parseErr.Status == "Error") {
      // await errorHandler.fcnCustomError(404, parseErr.Details);
      return { errors: parseErr.Details };
    }
  }
}

//* This Function is used to send OTPs
async function sendSms(
  phoneNumber,
  email,
  firstName,
  lastName,
  patientFirstName,
  patientLastName,
  date,
  time
) {
  try {
    //var Date = date.toISOString().split("T")[0];
    // console.log(Date, "DATEEE");
    var options = {
      method: "POST",
      url:
        "http://2factor.in/API/V1/" +
        process.env.TWO_FACTOR_API_KEY +
        "/ADDON_SERVICES/SEND/TSMS",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      form: {
        From: "ArchentsItHelpDesk",
        To: email,
        TemplateName: "Password",
        VAR1: firstName + " " + lastName,
        VAR3: date + " " + "at " + time + " ",
      },
    };
    let response = await request(options);
    // console.log(response, "/////response///");
    let result = await JSON.parse(response);
    logger.debug(result, "/////RESULT///");
    return result;
  } catch (err) {
    logger.error(err.toString());
    let parseErr = await JSON.parse(err.error);
    if (parseErr.Status == "Error") {
      await errorHandler.fcnCustomError(404, "Invalid Phone Number");
    }
  }
}

//* This Function is used to send Video Join link
async function sendLink(phoneNumber, patientFirstName, patientLastName, url) {
  try {
    // console.log(
    //   phoneNumber,
    //   patientFirstName,
    //   patientLastName,
    //   url.link,
    //   "*/*/*//*/"
    // );

    var options = {
      method: "POST",
      url:
        "http://2factor.in/API/V1/" +
        process.env.TWO_FACTOR_API_KEY +
        "/ADDON_SERVICES/SEND/TSMS",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      form: {
        From: "ACIANA",
        To: phoneNumber,
        TemplateName: "Your requested link to join the consultation",
        VAR1: patientFirstName + " " + patientLastName,
        VAR2: url.link,
      },
    };
    // console.log(options, "options");
    let response = await request(options);
    //console.log(response, "/////response///");
    let result = await JSON.parse(response);
    // console.log(result, "/////RESULT///");
    return result;
  } catch (err) {
    logger.error(err.toString());
    let parseErr = await JSON.parse(err.error);
    if (parseErr.Status == "Error") {
      await errorHandler.fcnCustomError(404, "Invalid Phone Number");
    }
  }
}
async function inviteSendSms(
  phoneNumber,
  doctorFirstName,
  doctorLastName,
  patientName,
  url
) {
  try {
    // var Date = date.toISOString().split("T")[0];
    // console.log(url.link, "Entered into two Factor");

    var options = {
      method: "POST",
      url:
        "http://2factor.in/API/V1/" +
        process.env.TWO_FACTOR_API_KEY +
        "/ADDON_SERVICES/SEND/TSMS",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      form: {
        From: "aciana",
        To: phoneNumber,
        TemplateName: "Link to access your report",
        VAR1: patientName,
        VAR2: doctorFirstName + " " + doctorLastName,
        VAR3: url.link + "  ",
        VAR4: url.link + "  ",
      },
    };
    let response = await request(options);
    // console.log(response, "/////response///");
    let result = await JSON.parse(response);
    // console.log(result, "/////RESULT///");
    return result;
  } catch (err) {
    logger.error(err.toString());
    let parseErr = await JSON.parse(err.error);
    if (parseErr.Status == "Error") {
      await errorHandler.fcnCustomError(404, "Invalid Phone Number");
    }
  }
}

exports.twoFactorService = {
  SMSTemplate: SMSTemplate,
  sendOTP: sendOTP,
  verifyOTP: verifyOTP,
  sendSms: sendSms,
  sendLink: sendLink,
  inviteSendSms: inviteSendSms,
};