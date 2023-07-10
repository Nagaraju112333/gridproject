const express = require("express");
 const bodyParser = require("body-parser");
 const cors = require("cors");
// const fileUpload = require("express-fileupload");
const errorhandler = require("errorhandler");
//const helmet = require("helmet");
const logger = require("./logger");
var morgan = require("morgan");

const app = express();
// app.use(fileUpload());
app.options("*", cors());
app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
// app.set("baseUrl", CONFIG.BASEURL);
// app.set("secret", CONFIG.JWT_SECRET);

app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    parameterLimit: 5000000,
    extended: true,
  })
);
// app.use(helmet());
app.use(morgan("combined", { stream: logger.stream }));
app.use(errorhandler());
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );
  res.status(err.status || 500);
  res.render(err);
  next(err);
});
module.exports = app;