import mongoose from "mongoose";

const pollSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [
      {
        text: { type: String, required: true },
        votes: { type: Number, default: 0 },
      },
    ],
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

const Poll = mongoose.model("Poll", pollSchema);
export default Poll;
