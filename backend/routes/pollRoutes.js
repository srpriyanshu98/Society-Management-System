import express from "express";
import {
    createPoll,
    getAllPolls,
    getPollById,
    updatePoll,
    deletePoll,
    votePoll,
} from "../controller/pollcontroller.js";

const router = express.Router();

// CRUD endpoints
router.post("/", createPoll); // Create a poll
router.get("/", getAllPolls); // Get all polls
router.get("/:id", getPollById); // Get a specific poll by ID
router.put("/:id", updatePoll); // Update a poll
router.delete("/:id", deletePoll); // Delete a poll
router.post("/:id/vote", votePoll); // Add this route for voting

export default router;
