import mongoose from "mongoose";

const otherIncomeSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		dueDate: {
			type: Date,
			required: true,
		},
		description: {
			type: String,
		},
		amount: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const OtherIncome = mongoose.model("OtherIncome", otherIncomeSchema);
export default OtherIncome;
