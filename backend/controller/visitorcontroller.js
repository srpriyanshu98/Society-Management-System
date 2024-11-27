import Visitor from "../model/visitormodel.js";

// Create a new visitor entry
export const createVisitor = async (req, res) => {
  const { visitorName, unit, wing, date, time, Number } = req.body;

  if (!visitorName || !unit || !wing || !date || !time || !Number) {
    return res.status(400).json({
      message: "All fields (visitorName, unit, wing, date, time) are required.",
    });
  }

  try {
    const visitor = new Visitor({
      visitorName,
      unit,
      wing,
      date,
      time,
      Number,
    });

    await visitor.save();
    res
      .status(201)
      .json({ message: "Visitor entry created successfully", visitor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating visitor entry", error: error.message });
  }
};

// Get all visitor entries
export const getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find();
    res.status(200).json(visitors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching visitors", error: error.message });
  }
};

// Get a single visitor entry by ID
export const getVisitorById = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }
    res.status(200).json(visitor);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching visitor", error: error.message });
  }
};

// Update a visitor entry
export const updateVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    res
      .status(200)
      .json({ message: "Visitor entry updated successfully", visitor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating visitor entry", error: error.message });
  }
};

// Delete a visitor entry
export const deleteVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndDelete(req.params.id);

    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    res.status(200).json({ message: "Visitor entry deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting visitor entry", error: error.message });
  }
};
