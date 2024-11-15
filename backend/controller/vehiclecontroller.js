import Vehicle from "../model/vehiclemodel.js";

// Create a new vehicle entry
export const createVehicle = async (req, res) => {
	try {
		const vehicle = new Vehicle(req.body);
		await vehicle.save();
		res.status(201).json(vehicle);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Get all vehicle entries
export const getVehicles = async (req, res) => {
	try {
		const vehicles = await Vehicle.find();
		res.status(200).json(vehicles);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get a vehicle entry by ID
export const getVehicleById = async (req, res) => {
	try {
		const vehicle = await Vehicle.findById(req.params.id);
		if (!vehicle) {
			return res.status(404).json({ message: "Vehicle not found" });
		}
		res.status(200).json(vehicle);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update a vehicle entry by ID
export const updateVehicle = async (req, res) => {
	try {
		const vehicle = await Vehicle.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		if (!vehicle) {
			return res.status(404).json({ message: "Vehicle not found" });
		}
		res.status(200).json(vehicle);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Delete a vehicle entry by ID
export const deleteVehicle = async (req, res) => {
	try {
		const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
		if (!vehicle) {
			return res.status(404).json({ message: "Vehicle not found" });
		}
		res.status(200).json({ message: "Vehicle deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
