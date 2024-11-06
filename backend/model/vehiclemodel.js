import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    vehicleType: {
      type: String,
      required: true,
      enum: ["two-wheeler", "four-wheeler"],
    },
    vehicleName: { type: String, required: true },
    vehicleNumber: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model("Vehicle", vehicleSchema);
