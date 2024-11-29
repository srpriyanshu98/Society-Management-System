import Owner from "../model/residentmodel.js";

// Create a new owner
export const createOwner = async (req, res) => {
  try {
    const ownerData = {
      ...req.body,
      aadharCardFront: req.files.aadharCardFront[0].path,
      aadharCardBack: req.files.aadharCardBack[0].path,
      addressProof: req.files.addressProof[0].path,
      rentAgreement: req.files.rentAgreement[0].path,
    };
    const owner = new Owner(ownerData);
    await owner.save();
    res.status(201).json(owner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all owners
export const getOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an owner by ID
export const getOwnerById = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    res.status(200).json(owner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an owner by ID
export const updateOwner = async (req, res) => {
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

    const owner = await Owner.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    res.status(200).json(owner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an owner by ID
export const deleteOwner = async (req, res) => {
  try {
    const owner = await Owner.findByIdAndDelete(req.params.id);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    // Delete the files associated with the record
    const deleteFile = (filePath) => {
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Failed to delete file: ${filePath}`, err);
      });
    };

    deleteFile(owner.aadharCardFront);
    deleteFile(owner.aadharCardBack);
    deleteFile(owner.addressProof);
    deleteFile(owner.rentAgreement);
    res.status(200).json({ message: "Owner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
