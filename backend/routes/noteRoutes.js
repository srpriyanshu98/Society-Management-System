import express from "express";
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controller/notecontroller.js";

const router = express.Router();

router.post("/", createNote); // Create a new note
router.get("/", getAllNotes); // Get all notes
router.get("/:id", getNoteById); // Get a single note by ID
router.put("/:id", updateNote); // Update a note by ID

export default router;
