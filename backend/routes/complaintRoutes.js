import express from "express";
import { admin } from "../middleware/authmiddleware.js";
import {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
} from "../controller/complaintcontroller.js";

const router = express.Router();

router.post("/", admin, createComplaint); // Create a new complaint
router.get("/", getComplaints); // Get all complaints
router.get("/:id", getComplaintById); // Get complaint by ID
router.put("/:id", admin, updateComplaint); // Update complaint by ID
router.delete("/:id", admin, deleteComplaint); // Delete complaint by ID

export default router;
