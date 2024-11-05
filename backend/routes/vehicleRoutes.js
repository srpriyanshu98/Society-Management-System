import express from "express";
import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../controller/vehiclecontroller.js";

const router = express.Router();

router.post("/", createVehicle); // Create a new vehicle entry
router.get("/", getVehicles); // Get all vehicle entries
router.get("/:id", getVehicleById); // Get a vehicle entry by ID
router.put("/:id", updateVehicle); // Update a vehicle entry by ID
router.delete("/:id", deleteVehicle); // Delete a vehicle entry by ID

export default router;
