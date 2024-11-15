import express from "express";
import {
	createImportantNumber,
	getImportantNumbers,
	getImportantNumberById,
	updateImportantNumber,
	deleteImportantNumber,
} from "../controller/importantNumbercontroller.js";

const router = express.Router();

router.post("/", createImportantNumber); // Create an important number
router.get("/", getImportantNumbers); // Get all important numbers
router.get("/:id", getImportantNumberById); // Get an important number by ID
router.put("/:id", updateImportantNumber); // Update an important number by ID
router.delete("/:id", deleteImportantNumber); // Delete an important number by ID

export default router;
