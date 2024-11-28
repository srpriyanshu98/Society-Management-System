import Alert from "../model/alertmodel.js";

// Create a new alert
export const createAlert = async (req, res) => {
	const { alertType, description, createdBy } = req.body;

	if (!alertType || !description) {
		return res
			.status(400)
			.json({ message: "Both alertType and description are required." });
	}

	try {
		const alert = new Alert({
			alertType,
			description,
			createdBy,
		});

		await alert.save();
		res.status(201).json({ message: "Alert created successfully", alert });
	} catch (error) {
		res.status(500).json({
			message: "Error creating alert",
			error: error.message,
		});
	}
};

// Get all alerts
export const getAllAlerts = async (req, res) => {
	try {
		const alerts = await Alert.find();
		res.status(200).json(alerts);
	} catch (error) {
		res.status(500).json({
			message: "Error fetching alerts",
			error: error.message,
		});
	}
};

// Get a single alert by ID
export const getAlertById = async (req, res) => {
	try {
		const alert = await Alert.findById(req.params.id);
		if (!alert) {
			return res.status(404).json({ message: "Alert not found" });
		}
		res.status(200).json(alert);
	} catch (error) {
		res.status(500).json({
			message: "Error fetching alert",
			error: error.message,
		});
	}
};

// Update an alert
export const updateAlert = async (req, res) => {
	try {
		const alert = await Alert.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!alert) {
			return res.status(404).json({ message: "Alert not found" });
		}

		res.status(200).json({ message: "Alert updated successfully", alert });
	} catch (error) {
		res.status(500).json({
			message: "Error updating alert",
			error: error.message,
		});
	}
};

// Delete an alert
export const deleteAlert = async (req, res) => {
	try {
		const alert = await Alert.findByIdAndDelete(req.params.id);

		if (!alert) {
			return res.status(404).json({ message: "Alert not found" });
		}

		res.status(200).json({ message: "Alert deleted successfully" });
	} catch (error) {
		res.status(500).json({
			message: "Error deleting alert",
			error: error.message,
		});
	}
};
