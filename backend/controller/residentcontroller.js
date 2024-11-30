import Resident from "../model/residentmodel.js";

// Create a new Resident
export const createResident = async (req, res) => {
  try {
    const residentData = {
      ...req.body,
      aadharCardFront: req.files.aadharCardFront[0].path,
      aadharCardBack: req.files.aadharCardBack[0].path,
      addressProof: req.files.addressProof[0].path,
      rentAgreement: req.files.rentAgreement[0].path,
    };
    const resident = new Resident(residentData);
    await resident.save();
    res.status(201).json(resident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Resident
export const getResident = async (req, res) => {
  try {
    const residents = await Resident.find();
    res.status(200).json(residents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an Resident by ID
export const getResidentById = async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);
    if (!resident) {
      return res.status(404).json({ message: "resident not found" });
    }
    res.status(200).json(resident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an Resident by ID
export const updateResident = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Check if new files were uploaded and update paths
    if (req.files.aadharCardFront)
      updateData.aadharCardFront = req.files.aadharCardFront[0].path;
    if (req.files.aadharCardBack)
      updateData.aadharCardBack = req.files.aadharCardBack[0].path;
    if (req.files.addressProof)
      updateData.addressProof = req.files.addressProof[0].path;
    if (req.files.rentAgreement)
      updateData.rentAgreement = req.files.rentAgreement[0].path;

    const resident = await Resident.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }
    res.status(200).json(resident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an Resident by ID
export const deleteResident = async (req, res) => {
  try {
    const resident = await Resident.findByIdAndDelete(req.params.id);
    if (!resident) {
      return res.status(404).json({ message: "resident not found" });
    }

    // Delete the files associated with the record
    const deleteFile = (filePath) => {
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Failed to delete file: ${filePath}`, err);
      });
    };

    deleteFile(resident.aadharCardFront);
    deleteFile(resident.aadharCardBack);
    deleteFile(resident.addressProof);
    deleteFile(resident.rentAgreement);
    res.status(200).json({ message: "resident deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
