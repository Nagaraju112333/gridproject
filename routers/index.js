const app = (module.exports = require("express")())

app.use("/",require("./stakeholdersModel"))

//app.use("/",require("./stakeholdersModel"));