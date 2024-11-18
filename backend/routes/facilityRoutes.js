import express from "express";
import {
  createFacility,
  getAllFacilities,
  getFacilityById,
  updateFacility,
  deleteFacility,
} from "../controller/facilitycontroller.js";

const router = express.Router();

router.post("/", createFacility); // Create a new facility
router.get("/", getAllFacilities); // Get all facilities
router.get("/:id", getFacilityById); // Get a single facility by ID
router.put("/:id", updateFacility); // Update a facility by ID
router.delete("/facilities/:id", deleteFacility); // Delete a facility by ID

export default router;
