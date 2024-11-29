import express from "express";
import { admin, verifyToken } from "../middleware/authmiddleware.js";
import {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
  getComplaint,
} from "../controller/complaintcontroller.js";

const router = express.Router();

router.post("/", verifyToken, createComplaint); // Create a new complaint
router.get("/", getComplaints); // Get all complaints
router.get("/:id", getComplaintById); // Get complaint by ID
router.put("/:id", admin, updateComplaint); // Update complaint by ID
router.delete("/:id", admin, deleteComplaint); // Delete complaint by ID
router.get("/getComplaint/:id", getComplaint); // Get all complaints

export default router;
