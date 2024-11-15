import express from "express";
import {
	createNote,
	getAllNotes,
	getNoteById,
	updateNote,
} from "../controller/notecontroller.js";

const router = express.Router();

// Create a new note
router.post("/", createNote);

// Get all notes
router.get("/", getAllNotes);

// Get a single note by ID
router.get("/:id", getNoteById);

// Update a note by ID
router.put("/:id", updateNote);

export default router;
