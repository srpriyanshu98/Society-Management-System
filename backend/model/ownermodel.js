import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		emailAddress: { type: String, required: true, unique: true },
		age: { type: Number, required: true },
		gender: {
			type: String,
			required: true,
			enum: ["male", "female", "other"],
		},
		wing: { type: String, required: true },
		unit: { type: String, required: true },
		relation: { type: String, required: true },
		aadharCardFront: { type: String },
		aadharCardBack: { type: String },
		addressProof: { type: String },
		rentAgreement: { type: String },
	},
	{ timestamps: true }
);

export default mongoose.model("Owner", ownerSchema);
