import express from "express";
import {
	createFacility,
	getAllFacilities,
	getFacilityById,
	updateFacility,
} from "../controller/facilitycontroller.js";

const router = express.Router();

// Create a new facility
router.post("/", createFacility);

// Get all facilities
router.get("/", getAllFacilities);

// Get a single facility by ID
router.get("/:id", getFacilityById);

// Update a facility by ID
router.put("/:id", updateFacility);

export default router;
