import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		date: {
			type: Date,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		bill: {
			type: String, // File path for the bill image
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
