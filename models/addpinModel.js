const con = require("../loaders/mongoose");
const mongoose=require("mongoose")
const PinDetailsSchema = new mongoose.Schema({
  pin: { type: String, required: true, unique: true },
  ownershipType: { type: String,enum:["OWNER", "TENENT", "FRACTIONAL OWNER"], required: true },
  ownershipStructure: {
    type: String,
    required: true,
  },
  owners: [
    {
      ownerID: { type: String},
      percentageOwned: { type: Number },
      proxy: { type: String },
      proxyType: {
        type: String,
        enum: ["proxy", " powerOfAttorney", "executor"],
      },
    },
  ],
  lawyer: { type: String },
  lender: { type: String },
 
  engineer: { type: String },
  realtor: { type: String },
  insuranceInfo: [
     {
      policyNumber: { type: String, required: true },
      typeOfInsuranceCoverage: { type: String, required: true },
      amountOfCoverage: { type: Number, required: true },
      effectiveDate: { type: Date, required: true },
      endOfTermDate: { type: Date, required: true },
      insurer: { type: String },
    },
],
  municipality: { type: String, required: true },
  easementHolder: { type: [String] },
  mortgageInfo: {
    type: {
      principalAmount: { type: Number },
      commencementDate: { type: Date },
      balanceDueDate: { type: Date },
      paymentDate: { type: Date },
      interestRate: { type: String },
      insuranceAmount: { type: Number },
      guarantor: { type: String },
      fileNumber: { type: String },
    },
  },
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
      county: { type: String, required: true},
      conservationAuthority: {
        type: String,
        required: true,
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