import Security from "../model/securitymodel.js";
import fs from "fs";
import path from "path";

// Create a new security record
export const createSecurity = async (req, res) => {
  const { fullName, phoneNumber, gender, shift, shiftDate, shiftTime } =
    req.body;
  // Access the files
  const guardPhoto = req.files?.guardPhoto
    ? req.files.guardPhoto[0].path
    : null;
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
      guardPhoto,
      aadharCard,
    });
    await newSecurity.save();
    res.status(201).json({
      message: "Security record created successfully",
      newSecurity,
    });
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

  // Access the uploaded files
  const guardPhoto = req.files?.guardPhoto
    ? req.files.guardPhoto[0].path
    : null;
  const aadharCard = req.files?.aadharCard
    ? req.files.aadharCard[0].path
    : null;

  console.log("Received update request for guard ID:", id);
  console.log("Received data:", {
    fullName,
    phoneNumber,
    gender,
    shift,
    shiftDate,
    shiftTime,
    guardPhoto,
    aadharCard,
  });

  try {
    // Find the existing security record
    const existingSecurity = await Security.findById(id);
    if (!existingSecurity) {
      return res.status(404).json({ message: "Security record not found" });
    }

    // Update the fields conditionally
    existingSecurity.fullName = fullName || existingSecurity.fullName;
    existingSecurity.phoneNumber = phoneNumber || existingSecurity.phoneNumber;
    existingSecurity.gender = gender || existingSecurity.gender;
    existingSecurity.shift = shift || existingSecurity.shift;
    existingSecurity.shiftDate = shiftDate || existingSecurity.shiftDate;
    existingSecurity.shiftTime = shiftTime || existingSecurity.shiftTime;

    // Update files only if new ones are uploaded
    if (guardPhoto) {
      existingSecurity.guardPhoto = guardPhoto;
    }
    if (aadharCard) {
      existingSecurity.aadharCard = aadharCard;
    }

    // Save the updated record
    const updatedSecurity = await existingSecurity.save();

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
  try {
    const { id } = req.params;
    const securityRecord = await Security.findByIdAndDelete(id);

    if (!securityRecord) {
      return res
        .status(404)
        .json({ success: false, message: "Security record not found" });
    }

    // Delete the files associated with the record
    const deleteFile = (filePath) => {
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Failed to delete file: ${filePath}`, err);
      });
    };

    deleteFile(securityRecord.guardPhoto);
    deleteFile(securityRecord.aadharCard);

    res.status(200).json({
      success: true,
      message: "Security record and files deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
