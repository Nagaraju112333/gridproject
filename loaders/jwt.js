const express = require("express");
const expressJWT = require("express-jwt");
const bearerToken = require("express-bearer-token");
var jwt = require("jsonwebtoken");
//const CONFIG = require("./dotenv");
const app = require("./express");
const logger = require("./logger");
const pathToRegexp = require("path-to-regexp");
const { verbose } = require("winston");

// app.set("secret", CONFIG.JWT_SECRET);


app.use(bearerToken());
exports.authorization = async (req, res, next) => {
  //console.log(req.originalUrl.indexOf("/register"), "**");
  logger.info(" New request for  " + req.originalUrl);
  let string = req.originalUrl;
  if (req.originalUrl.indexOf("/stakeholderREgister") >= 0) {
    return next();
  }if (req.originalUrl.indexOf("/verifyAccount") >= 0) {
    return next();
  }
if (req.originalUrl.indexOf("/login") >= 0) {
  return next();
}
// if (req.originalUrl.indexOf("/addpin") >= 0) {
//   return next();
// }

  
  
  
  var token = req.token;
  jwt.verify(token, app.get("secret")|| 'default-secret-key', async function (err, decoded) {
    //console.log(err)
    if (err) {
      res.status(401).send({
        success: false,
        code: 401,
        message:
          "Failed to authenticate token. Make sure to include the " +
          "token returned from login in the authorization header " +
          " as a Bearer token",
      });
      return;
    } else {
        console.log(decoded)
        req.exp = decoded.exp;
        req.id = decoded.id;
        req.body.id = decoded.id;
        req.body.UName = decoded.username;
        req.empID = decoded.empID;
        req.role = decoded.role;
        //console.log(req.id,req.body.id)
        // req._id=decoded._id;
        logger.info(
          "Decoded from JWT token: username - " +
            decoded.username +
            ", expiry - " +
            decoded.exp +
            ",ID - " +
          decoded.id +
          ", Designation - " +
          decoded.role +
          ", employeeD - " +
          decoded.employeeD
        );
        next();
      }
  });
};
