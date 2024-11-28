import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
	{
		alertType: { type: String, required: true },
		description: { type: String, required: true },
	},
	{ timestamps: true }
);

const Alert = mongoose.model("Alert", alertSchema);
export default Alert;
