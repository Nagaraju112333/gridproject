const con = require("../loaders/mongoose");
const { OWNERSHIP_TYPE } = require("../config/config");
const { OWNERSHIP_STRUCTURE } = require("../config/config");
const mongoose=require("mongoose")
const PinDetailsSchema = new mongoose.Schema({
  pin: { type: String, required: true, unique: true },
  ownershipType: { type: String,required: true },
  ownershipStructure: {
    type: String,
    required: true,
  },
  owners: [
    {
      ownerID: { type: String, ref: "Stakeholders" },
      percentageOwned: { type: Number },
      proxy: { type: String, ref: "Stakeholders" },
      proxyType: {
        type: String,
        enum: ["proxy", " powerOfAttorney", "executor"],
      },
    },
  ],
  // insuranceInfo: {
  //   type: {
  //     policyNumber: { type: String, required: true },
  //     typeOfInsuranceCoverage: { type: String, required: true },
  //     amountOfCoverage: { type: Number, required: true },
  //     effectiveDate: { type: Date, required: true },
  //     endOfTermDate: { type: Date, required: true },
  //   },
  // },
  municipality: { type: String, required: true, ref: "Stakeholders" },
  pinInfo: {
    type: {
      rollNumber: { type: String },
      legalDescription: { type: String },
      lotFrontage: { type: String },
      lotDepth: { type: String },
      zoning: { type: String },
      purchaseAmount: { type: Number },
      purchaseDate: { type: Date },
      streetNumber: { type: String, required: true },
      streetName: { type: String, required: true },
      unitNumber: { type: String, required: true },
      city: { type: String, required: true },
      county: { type: String, required: true, ref: "Stakeholders" },
      conservationAuthority: {
        type: String,
        required: true,
        ref: "Stakeholders",
      },
      province: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    // required: true,
  },
  createdOn: { type: Date },
  isActive: { type: Boolean, required: true, default: true },
  canStartWF: { type: Boolean, default: true },
});

const pinDetails = con.db1.model("PinDetails", PinDetailsSchema);

module.exports = pinDetails;

