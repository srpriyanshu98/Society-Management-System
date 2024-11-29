import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    vehicleType: {
      type: String,

      enum: ["two-wheeler", "four-wheeler"],
    },
    vehicleName: { type: String },
    vehicleNumber: { type: String, unique: true },
  },
  { timestamps: true }
);

const MemberSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    phoneNumber: { type: String },
    emailAddress: { type: String, unique: true },
    age: { type: Number },
    gender: {
      type: String,

      enum: ["male", "female", "other"],
    },
    relation: { type: String },
  },
  { timestamps: true }
);

const OwnerSchema = new mongoose.Schema(
  {
    OwnerfullName: { type: String },
    Ownerphone: { type: String },
    Owneraddress: { type: String, unique: true },
  },
  { timestamps: true }
);

const residentSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    phoneNumber: { type: String },
    emailAddress: { type: String, unique: true },
    age: { type: Number },
    gender: {
      type: String,

      enum: ["male", "female", "other"],
    },
    wing: { type: String },
    unit: { type: String },
    relation: { type: String },
    aadharCardFront: { type: String },
    aadharCardBack: { type: String },
    addressProof: { type: String },
    rentAgreement: { type: String },
    vehicle: [vehicleSchema],
    memberSchema: [MemberSchema],
    ownerSchema: [OwnerSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Resident", residentSchema);
