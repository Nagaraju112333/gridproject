const app = require("./loaders/express");
//const routes=require('./routers')
const CONFIG = require("./loaders/ dotenv");
const logger = require("./loaders/logger");
 const handleAsyncExceptions = require("./loaders/handleError");
 //const routes=require("./routes")
 const {authorization}=require("./loaders/jwt")
 const  {monodbservice}= require("./loaders/mongoose")
 const bearerToken = require("express-bearer-token");
const routes=require("./routers");
 //const routes = require("./routes");
// const bearerToken = require("express-bearer-token");
//onst expressJWT = require("express-jwt");
// const pathToRegexp = require("path-to-regexp");
// const { authorisation } = require("./loaders/jwt");
// ///////////////
/////////////
const unprotected = [
  //pathToRegexp("/login"),
  //pathToRegexp("/favicon.ico"),
  "/stakeholderREgister",
  "/verifyAccount",
  "/login",
  //"/addpin"

];
/**Express server starts here */
async function run() {
  try {
    // app.use(
    //   expressJWT({
    //     secret: CONFIG.JWT_SECRET,
    //     algorithms: ["HS256"],
    //   }).unless({
    //     path: unprotected,
    //   })
    // );
    // app.use(httpLogger);
    app.use(bearerToken());
    app.use(authorization);
   // let dbresult = await  monodbservice.monogdbConnection();
    app.use(routes);
    //mongoose = require("./loaders/mongoose")
    // Starting server and listening at port defined in .env file
    app.listen(CONFIG.EXPRESS_PORT, CONFIG.EXPRESS_HOST, function (err) {
      if (err) {
        logger.error("Failed to start the server " + err);
      }
      logger.info(
        "gridproject Module is running on http://" +
          CONFIG.EXPRESS_HOST +
          ":" +
          CONFIG.EXPRESS_PORT
      );
    });
  } catch (err) {
    logger.error(err);
    throw new Error(err);
  }
}
//////////////////
module.exports = run;
if (require.main === module) {
  handleAsyncExceptions();
  run();
}
