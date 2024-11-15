import mongoose from "mongoose";

const securityProtocolSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			default: Date.now,
		},
		time: {
			type: String,
		},
	},
	{ timestamps: true }
);

const SecurityProtocol = mongoose.model(
	"SecurityProtocol",
	securityProtocolSchema
);

export default SecurityProtocol;
