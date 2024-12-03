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
    emailAddress: { type: String, unique: true, required: true },
    age: { type: Number },
    gender: {
      type: String,

      enum: ["male", "female", "other"],
    },
    relation: { type: String },
  },
  { timestamps: true }
);

MemberSchema.index({ emailAddress: 1, _id: 1 }, { unique: true });

const OwnerSchema = new mongoose.Schema(
  {
    OwnerfullName: { type: String },
    Ownerphone: { type: String },
    Owneraddress: { type: String, unique: true, required: true },
    emailAddress: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

OwnerSchema.index({ emailAddress: 1, _id: 1 }, { unique: true });
OwnerSchema.index({ Owneraddress: 1, _id: 1 }, { unique: true });

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

residentSchema.index({ emailAddress: 1, _id: 1 }, { unique: true });

export default mongoose.model("Resident", residentSchema);
