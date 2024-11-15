import Tenant from "../model/tenantmodel.js";

// Create a new tenant entry
export const createTenant = async (req, res) => {
  try {
    const tenantData = {
      ...req.body,
      aadharCardFront: req.files.aadharCardFront[0].path,
      aadharCardBack: req.files.aadharCardBack[0].path,
      addressProof: req.files.addressProof[0].path,
      rentAgreement: req.files.rentAgreement[0].path,
    };
    const tenant = new Tenant(tenantData);
    await tenant.save();
    res.status(201).json(tenant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all tenants
export const getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.status(200).json(tenants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a tenant by ID
export const getTenantById = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.status(200).json(tenant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a tenant by ID
export const updateTenant = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.files.aadharCardFront)
      updateData.aadharCardFront = req.files.aadharCardFront[0].path;
    if (req.files.aadharCardBack)
      updateData.aadharCardBack = req.files.aadharCardBack[0].path;
    if (req.files.addressProof)
      updateData.addressProof = req.files.addressProof[0].path;
    if (req.files.rentAgreement)
      updateData.rentAgreement = req.files.rentAgreement[0].path;

    const tenant = await Tenant.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.status(200).json(tenant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a tenant by ID
export const deleteTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndDelete(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    // Delete the files associated with the record
    const deleteFile = (filePath) => {
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Failed to delete file: ${filePath}`, err);
      });
    };

    deleteFile(tenant.aadharCardFront);
    deleteFile(tenant.aadharCardBack);
    deleteFile(tenant.addressProof);
    deleteFile(tenant.rentAgreement);

    res.status(200).json({ message: "Tenant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
