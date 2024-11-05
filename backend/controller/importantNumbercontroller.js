import ImportantNumber from "../model/importantNumbermodel.js";

// Create a new important number
export const createImportantNumber = async (req, res) => {
  try {
    const importantNumber = new ImportantNumber(req.body);
    await importantNumber.save();
    res.status(201).json(importantNumber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all important numbers
export const getImportantNumbers = async (req, res) => {
  try {
    const importantNumbers = await ImportantNumber.find();
    res.status(200).json(importantNumbers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single important number by ID
export const getImportantNumberById = async (req, res) => {
  try {
    const importantNumber = await ImportantNumber.findById(req.params.id);
    if (!importantNumber) {
      return res.status(404).json({ message: "Important number not found" });
    }
    res.status(200).json(importantNumber);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an important number by ID
export const updateImportantNumber = async (req, res) => {
  try {
    const importantNumber = await ImportantNumber.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!importantNumber) {
      return res.status(404).json({ message: "Important number not found" });
    }
    res.status(200).json(importantNumber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an important number by ID
export const deleteImportantNumber = async (req, res) => {
  try {
    const importantNumber = await ImportantNumber.findByIdAndDelete(
      req.params.id
    );
    if (!importantNumber) {
      return res.status(404).json({ message: "Important number not found" });
    }
    res.status(200).json({ message: "Important number deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
