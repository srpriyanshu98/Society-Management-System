import express from "express";
import {
  createAlert,
  getAllAlerts,
  getAlertById,
  updateAlert,
  deleteAlert,
} from "../controller/alertcontroller.js";

const router = express.Router();

// CRUD endpoints
router.post("/", createAlert); // Create an alert
router.get("/", getAllAlerts); // Get all alerts
router.get("/:id", getAlertById); // Get a specific alert by ID
router.put("/:id", updateAlert); // Update an alert
router.delete("/:id", deleteAlert); // Delete an alert

export default router;
