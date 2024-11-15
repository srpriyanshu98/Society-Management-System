import express from "express";
import {
	createSociety,
	getSocieties,
	getSocietyById,
	updateSociety,
	deleteSociety,
} from "../controller/societycontroller.js";

const router = express.Router();

router.post("/createSociety", createSociety); // Create a new society
router.get("/getSocieties", getSocieties); // Get all societies
router.get("/:id", getSocietyById); // Get society by ID
router.put("/:id", updateSociety); // Update society by ID
router.delete("/:id", deleteSociety); // Delete society by ID

export default router;
