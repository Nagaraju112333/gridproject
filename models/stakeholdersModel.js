const con= require("../loaders/mongoose");
//const uuid = require("uuidv4").default;
//const CONFIG = require("../loaders/ dotenv");
//const { STAKEHOLDERS } = require("../config/config");
//const hasher = require("../lib/hasher");
const mongoose = require("mongoose");

const stakeholdersSchema = new  mongoose.Schema({
  role: { type: String, required: true },
  emailID: { type: String, lowercase: true, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String },
  phoneNumber: { type: String, required: true },
  address: {
    type: {
      streetNumber: { type: String, required: true },
      streetName: { type: String, required: true },
      unitNumber: { type: String, required: true },
      city: { type: String, required: true },
      county: { type: String, required: true },
      province: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
  },
  //lawyer: { type: String },
  profilePic: { type: String },
  dob: { type: String },
  gender: { type: String, enum: ["M", "F", "O"] },
  emailVerified: { type: Boolean, default: false },
});

const stakeholders=con.db1.model("Stakeholders", stakeholdersSchema);
module.exports=stakeholders;