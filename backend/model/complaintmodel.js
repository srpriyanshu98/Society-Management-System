import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
	{
		complainerName: { type: String, required: true },
		complaintName: { type: String, required: true },
		description: { type: String, required: true },
		wing: { type: String, required: true },
		unit: { type: String, required: true },
		priority: {
			type: String,
			enum: ["high", "medium", "low"],
			default: "medium",
		},
		status: {
			type: String,
			enum: ["open", "pending", "solved"],
			default: "open",
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
