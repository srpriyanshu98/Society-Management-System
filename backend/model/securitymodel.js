import mongoose from "mongoose";

const securitySchema = new mongoose.Schema(
	{
		photo: {
			type: String,
		},
		fullName: {
			type: String,
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
			enum: ["day", "night"],
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
			type: String, // URL or file path for the Aadhar card image
			required: true,
		},
	},
	{ timestamps: true }
);

const Security = mongoose.model("Security", securitySchema);

export default Security;
