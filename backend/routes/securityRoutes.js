import express from "express";
import upload from "../middleware/upload.js";

import {
	createSecurity,
	getAllSecurityRecords,
	getSecurityById,
	updateSecurity,
	deleteSecurity,
} from "../controller/securitycontroller.js";

const router = express.Router();

// Create a new security record with file upload
router.post(
	"/",
	upload.fields([
		{ name: "photo", maxCount: 1 },
		{ name: "aadharCard", maxCount: 1 },
	]),
	createSecurity
);

// Get all security records
router.get("/", getAllSecurityRecords);

// Get a single security record by ID
router.get("/:id", getSecurityById);

// Update a security record by ID
router.put("/:id", updateSecurity);

// Delete a security record by ID
router.delete("/:id", deleteSecurity);

export default router;
