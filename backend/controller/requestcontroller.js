import Request from "../model/requestmodel.js";

// Create a new request
export const createRequest = async (req, res) => {
	const {
		requesterName,
		requestName,
		requestDescp,
		requestDate,
		wing,
		unit,
		priority,
		status,
	} = req.body;

	try {
		const newRequest = new Request({
			requesterName,
			requestName,
			requestDescp,
			requestDate,
			wing,
			unit,
			priority,
			status,
		});
		await newRequest.save();
		res.status(201).json({
			message: "Request created successfully",
			newRequest,
		});
	} catch (error) {
		res.status(400).json({
			message: "Error creating request",
			error: error.message,
		});
	}
};

// Get all requests
export const getAllRequests = async (req, res) => {
	try {
		const requests = await Request.find();
		res.status(200).json(requests);
	} catch (error) {
		res.status(400).json({
			message: "Error fetching requests",
			error: error.message,
		});
	}
};

// Get a single request by ID
export const getRequestById = async (req, res) => {
	const { id } = req.params;
	try {
		const request = await Request.findById(id);
		if (!request) {
			return res.status(404).json({ message: "Request not found" });
		}
		res.status(200).json(request);
	} catch (error) {
		res.status(400).json({
			message: "Error fetching request",
			error: error.message,
		});
	}
};

// Update a request by ID
export const updateRequest = async (req, res) => {
	const { id } = req.params;
	const {
		requesterName,
		requestName,
		requestDescp,
		requestDate,
		wing,
		unit,
		priority,
		status,
	} = req.body;

	try {
		const updatedRequest = await Request.findByIdAndUpdate(
			id,
			{
				requesterName,
				requestName,
				requestDescp,
				requestDate,
				wing,
				unit,
				priority,
				status,
			},
			{ new: true, runValidators: true }
		);
		if (!updatedRequest) {
			return res.status(404).json({ message: "Request not found" });
		}
		res.status(200).json({
			message: "Request updated successfully",
			updatedRequest,
		});
	} catch (error) {
		res.status(400).json({
			message: "Error updating request",
			error: error.message,
		});
	}
};

// Delete a request by ID
export const deleteRequest = async (req, res) => {
	const { id } = req.params;

	try {
		const deletedRequest = await Request.findByIdAndDelete(id);
		if (!deletedRequest) {
			return res.status(404).json({ message: "Request not found" });
		}
		res.status(200).json({
			message: "Request deleted successfully",
			deletedRequest,
		});
	} catch (error) {
		res.status(400).json({
			message: "Error deleting request",
			error: error.message,
		});
	}
};
