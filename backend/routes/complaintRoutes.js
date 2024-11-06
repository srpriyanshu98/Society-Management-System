import express from "express";
import {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
} from "../controller/complaintcontroller.js";

const router = express.Router();

router.post("/", createComplaint); // Create a new complaint
router.get("/", getComplaints); // Get all complaints
router.get("/:id", getComplaintById); // Get complaint by ID
router.put("/:id", updateComplaint); // Update complaint by ID
router.delete("/:id", deleteComplaint); // Delete complaint by ID

export default router;
