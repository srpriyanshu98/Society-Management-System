import Maintenance from "../model/maintenancemodel.js";

// Add a new maintenance record
export const addMaintenance = async (req, res) => {
  try {
    const maintenance = new Maintenance(req.body);
    await maintenance.save();
    res
      .status(201)
      .json({ message: "Maintenance added successfully", maintenance });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding maintenance", error: error.message });
  }
};

// Get all maintenance records
export const getAllMaintenance = async (req, res) => {
  try {
    const maintenanceRecords = await Maintenance.find();
    res.status(200).json(maintenanceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
