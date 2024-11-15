import OtherIncome from "../model/otherIncomemodel.js";

// Add a new other income record
export const addOtherIncome = async (req, res) => {
	try {
		const otherIncome = new OtherIncome(req.body);
		await otherIncome.save();
		res.status(201).json({
			message: "Other income added successfully",
			otherIncome,
		});
	} catch (error) {
		res.status(400).json({
			message: "Error adding other income",
			error: error.message,
		});
	}
};

// Get all other income records
export const getAllOtherIncome = async (req, res) => {
	try {
		const otherIncomeRecords = await OtherIncome.find();
		res.status(200).json(otherIncomeRecords);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get a single other income record by ID
export const getOtherIncomeById = async (req, res) => {
	try {
		const otherIncome = await OtherIncome.findById(req.params.id);
		if (!otherIncome) {
			return res.status(404).json({ message: "Other income not found" });
		}
		res.status(200).json(otherIncome);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update other income record by ID
export const updateOtherIncome = async (req, res) => {
	try {
		const otherIncome = await OtherIncome.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		if (!otherIncome) {
			return res.status(404).json({ message: "Other income not found" });
		}
		res.status(200).json({
			message: "Other income updated successfully",
			otherIncome,
		});
	} catch (error) {
		res.status(400).json({
			message: "Error updating other income",
			error: error.message,
		});
	}
};

// Delete other income record by ID
export const deleteOtherIncome = async (req, res) => {
	try {
		const otherIncome = await OtherIncome.findByIdAndDelete(req.params.id);
		if (!otherIncome) {
			return res.status(404).json({ message: "Other income not found" });
		}
		res.status(200).json({ message: "Other income deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
