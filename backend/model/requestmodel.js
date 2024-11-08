import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    requesterName: {
      type: String,
      required: true,
    },
    requestName: {
      type: String,
      required: true,
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
    wing: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["open", "pending", "solve"],
      default: "open",
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;
