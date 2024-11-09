import SecurityProtocol from "../model/securityProtocolmodel.js";

// Create a new security protocol
export const createSecurityProtocol = async (req, res) => {
  const { title, description, date, time } = req.body;

  try {
    const newSecurityProtocol = new SecurityProtocol({
      title,
      description,
    });
    await newSecurityProtocol.save();
    res.status(201).json({
      message: "Security protocol created successfully",
      newSecurityProtocol,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating security protocol",
      error: error.message,
    });
  }
};

// Get all security protocols
export const getAllSecurityProtocols = async (req, res) => {
  try {
    const securityProtocols = await SecurityProtocol.find();
    res.status(200).json(securityProtocols);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching security protocols",
      error: error.message,
    });
  }
};

// Get a single security protocol by ID
export const getSecurityProtocolById = async (req, res) => {
  const { id } = req.params;
  try {
    const securityProtocol = await SecurityProtocol.findById(id);
    if (!securityProtocol) {
      return res.status(404).json({ message: "Security protocol not found" });
    }
    res.status(200).json(securityProtocol);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching security protocol",
      error: error.message,
    });
  }
};

// Update a security protocol by ID
export const updateSecurityProtocol = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, time } = req.body;

  try {
    const updatedSecurityProtocol = await SecurityProtocol.findByIdAndUpdate(
      id,
      { title, description, date, time },
      { new: true, runValidators: true }
    );
    if (!updatedSecurityProtocol) {
      return res.status(404).json({ message: "Security protocol not found" });
    }
    res.status(200).json({
      message: "Security protocol updated successfully",
      updatedSecurityProtocol,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating security protocol",
      error: error.message,
    });
  }
};

// Delete a security protocol by ID
export const deleteSecurityProtocol = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSecurityProtocol = await SecurityProtocol.findByIdAndDelete(
      id
    );
    if (!deletedSecurityProtocol) {
      return res.status(404).json({ message: "Security protocol not found" });
    }
    res.status(200).json({
      message: "Security protocol deleted successfully",
      deletedSecurityProtocol,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error deleting security protocol",
      error: error.message,
    });
  }
};
