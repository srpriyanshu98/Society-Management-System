import express from "express";
import {
	createVisitor,
	getAllVisitors,
	getVisitorById,
	updateVisitor,
	deleteVisitor,
} from "../controller/visitorcontroller.js";

const router = express.Router();

// CRUD endpoints
router.post("/", createVisitor); // Create a visitor entry
router.get("/", getAllVisitors); // Get all visitor entries
router.get("/:id", getVisitorById); // Get a specific visitor entry by ID
router.put("/:id", updateVisitor); // Update a visitor entry
router.delete("/:id", deleteVisitor); // Delete a visitor entry

export default router;
