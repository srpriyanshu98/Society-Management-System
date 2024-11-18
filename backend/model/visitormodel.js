import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    visitorName: { type: String, required: true },
    unit: { type: String, required: true },
    wing: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

const Visitor = mongoose.model("Visitor", visitorSchema);
export default Visitor;
