import Complaint from "../model/complaintmodel.js";
import User from "../model/usermodel.js";

// Create a new complaint
export const createComplaint = async (req, res) => {
  const { complainerName, complaintName, description, wing, unit, priority } =
    req.body;

  const createdById = req.user.id; // User ID from token
  const userRole = req.user.role;

  try {
    const complaint = new Complaint({
      complainerName,
      complaintName,
      description,
      wing,
      unit,
      priority,
      createdById,
      userRole,
    });
    await complaint.save();
    res
      .status(201)
      .json({ message: "Complaint created successfully", complaint });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating complaint", error: error.message });
  }
};

// Get all complaints
export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single complaint by ID
export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a complaint by ID
export const updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json(complaint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a complaint by ID
export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getComplaint = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("createdById");
    res.status(200).json(complaints);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching complaints", error: error.message });
  }
};
