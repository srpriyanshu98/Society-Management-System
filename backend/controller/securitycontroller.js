import Security from "../model/securitymodel.js";

// Create a new security record
export const createSecurity = async (req, res) => {
  const { fullName, phoneNumber, gender, shift, shiftDate, shiftTime } =
    req.body;
  // Access the files
  const photo = req.files?.photo ? req.files.photo[0].path : null;
  const aadharCard = req.files?.aadharCard
    ? req.files.aadharCard[0].path
    : null;

  if (!aadharCard) {
    return res.status(400).json({ message: "Aadhar Card file is required" });
  }

  try {
    const newSecurity = new Security({
      fullName,
      phoneNumber,
      gender,
      shift,
      shiftDate,
      shiftTime,
      photo,
      aadharCard,
    });
    await newSecurity.save();
    res
      .status(201)
      .json({ message: "Security record created successfully", newSecurity });
  } catch (error) {
    res.status(400).json({
      message: "Error creating security record",
      error: error.message,
    });
  }
};

// Get all security records
export const getAllSecurityRecords = async (req, res) => {
  try {
    const securityRecords = await Security.find();
    res.status(200).json(securityRecords);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching security records",
      error: error.message,
    });
  }
};

// Get a single security record by ID
export const getSecurityById = async (req, res) => {
  const { id } = req.params;
  try {
    const security = await Security.findById(id);
    if (!security) {
      return res.status(404).json({ message: "Security record not found" });
    }
    res.status(200).json(security);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching security record",
      error: error.message,
    });
  }
};

// Update a security record by ID
export const updateSecurity = async (req, res) => {
  const { id } = req.params;
  const { fullName, phoneNumber, gender, shift, shiftDate, shiftTime } =
    req.body;

  try {
    const updatedSecurity = await Security.findByIdAndUpdate(
      id,
      { fullName, phoneNumber, gender, shift, shiftDate, shiftTime },
      { new: true, runValidators: true }
    );
    if (!updatedSecurity) {
      return res.status(404).json({ message: "Security record not found" });
    }
    res.status(200).json({
      message: "Security record updated successfully",
      updatedSecurity,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating security record",
      error: error.message,
    });
  }
};

// Delete a security record by ID
export const deleteSecurity = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSecurity = await Security.findByIdAndDelete(id);
    if (!deletedSecurity) {
      return res.status(404).json({ message: "Security record not found" });
    }
    res.status(200).json({
      message: "Security record deleted successfully",
      deletedSecurity,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error deleting security record",
      error: error.message,
    });
  }
};
