import express from "express";
import {
    createFacility,
    getAllFacilities,
    getFacilityById,
    updateFacility,
    deleteFacility,
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

// Delete a facility by ID
router.delete("/facilities/:id", deleteFacility);

export default router;
