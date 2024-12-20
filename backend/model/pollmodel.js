// import mongoose from "mongoose";

// const pollSchema = new mongoose.Schema(
//   {
//     question: { type: String, required: true },
//     options: [
//       {
//         text: { type: String, required: true },
//         votes: { type: Number, default: 0 },
//       },
//     ],
//     createdBy: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const Poll = mongoose.model("Poll", pollSchema);
// export default Poll;
import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 },
});

const pollSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [optionSchema], // Use the optionSchema here
    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Resident", // Dynamic reference field
    },
  },
  { timestamps: true }
);

const Poll = mongoose.model("Poll", pollSchema);
export default Poll;
