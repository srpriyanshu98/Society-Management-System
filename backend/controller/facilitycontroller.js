import Facility from "../model/facilitymodel.js";

// Create a new facility
export const createFacility = async (req, res) => {
	const { facilityName, description, scheduleServiceDate, remindBefore } =
		req.body;

	try {
		const newFacility = new Facility({
			facilityName,
			description,
			scheduleServiceDate,
			remindBefore,
		});
		await newFacility.save();
		res.status(201).json({
			message: "Facility created successfully",
			newFacility,
		});
	} catch (error) {
		res.status(400).json({
			message: "Error creating facility",
			error: error.message,
		});
	}
};

// Get all facilities
export const getAllFacilities = async (req, res) => {
	try {
		const facilities = await Facility.find();
		res.status(200).json(facilities);
	} catch (error) {
		res.status(400).json({
			message: "Error fetching facilities",
			error: error.message,
		});
	}
};

// Get a single facility by ID
export const getFacilityById = async (req, res) => {
	const { id } = req.params;
	try {
		const facility = await Facility.findById(id);
		if (!facility) {
			return res.status(404).json({ message: "Facility not found" });
		}
		res.status(200).json(facility);
	} catch (error) {
		res.status(400).json({
			message: "Error fetching facility",
			error: error.message,
		});
	}
};

// Update a facility by ID
export const updateFacility = async (req, res) => {
	const { id } = req.params;
	const { facilityName, description, scheduleServiceDate, remindBefore } =
		req.body;

	try {
		const updatedFacility = await Facility.findByIdAndUpdate(
			id,
			{ facilityName, description, scheduleServiceDate, remindBefore },
			{ new: true, runValidators: true }
		);
		if (!updatedFacility) {
			return res.status(404).json({ message: "Facility not found" });
		}
		res.status(200).json({
			message: "Facility updated successfully",
			updatedFacility,
		});
	} catch (error) {
		res.status(400).json({
			message: "Error updating facility",
			error: error.message,
		});
	}
};

// Delete a facility by ID
export const deleteFacility = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFacility = await Facility.findByIdAndDelete(id);
    if (!deletedFacility) {
      return res.status(404).json({ message: "Facility not found" });
    }
    res
      .status(200)
      .json({ message: "Facility deleted successfully", deletedFacility });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting facility", error: error.message });
  }
};
