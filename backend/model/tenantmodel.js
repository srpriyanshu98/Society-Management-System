import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
	{
		ownerFullName: { type: String, required: true },
		ownerPhone: { type: String, required: true },
		ownerAddress: { type: String, required: true },
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

export default mongoose.model("Tenant", tenantSchema);
