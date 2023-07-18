const con= require("../loaders/mongoose");
const mongoose=require("mongoose")
const CONFIG = require("../loaders/ dotenv");
//const { STAKEHOLDERS } = require("../config/config");
const pinAcceptanceSchema =new mongoose.Schema({
  pin: { type: String },
  addedByID: { type: String },
  addedByName:{ type: String },
  addedByRole: { type: String },
  stakeholderID: { type: String, required: true },
  role: { type: String,required: true },
  stakeholderAcceptence: {
    type: String,
    enum: ["ACCEPTED", "REJECTED", "PENDING", "CANCELLED", "WAITING", "N/A","COMPLETED"],
  },
  operation: {
    type: String,
    enum: ["ADD_SH", "CHANGE_SH", "REVOKE_SH", "PROXY"],
  },
  operationMessage: { type: String },//send  owner message 
  consensus: [
    {
      userID: { type: String },
      userRole: { type: String },
      proxy:{type: String},
      response: {
        type: String,
        enum: ["ACCEPTED", "REJECTED", "PENDING", "WAITING"],
      },
    },
  ],
  consensusMessage: { type: String },// lower send message
  timestamp: {
    type: Number,
    required: true,
  },
});
const pinAcceptance =con.db1.model("pinAcceptance", pinAcceptanceSchema);
module.exports = pinAcceptance;