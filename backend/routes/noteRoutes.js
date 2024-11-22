import express from "express";
import {
	createNote,
	deleteNote,
	getAllNotes,
	getNoteById,
	updateNote,
} from "../controller/notecontroller.js";

const router = express.Router();

router.post("/", createNote); // Create a new note
router.get("/", getAllNotes); // Get all notes
router.get("/:id", getNoteById); // Get a single note by ID
router.put("/:id", updateNote); // Update a note by ID
router.delete("/:id", deleteNote);

export default router;
