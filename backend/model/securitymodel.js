import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const securitySchema = new mongoose.Schema(
  {
    guardPhoto: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    shift: {
      type: String,
      enum: ["Day", "Night"],
      required: true,
    },
    shiftDate: {
      type: Date,
      required: true,
    },
    shiftTime: {
      type: String,
      required: true,
    },
    aadharCard: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

securitySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

securitySchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const Security = mongoose.model("Security", securitySchema);

export default Security;
