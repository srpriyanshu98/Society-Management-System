import mongoose from "mongoose";

const societySchema = new mongoose.Schema(
  {
    societyname: { type: String, required: true, unique: true },
    societyaddress: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: Number, required: true },
  },
  { timestamps: true }
);

const Society = mongoose.model("Society", societySchema);
export default Society;
