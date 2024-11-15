import express from "express";
import {
	createAnnouncement,
	getAllAnnouncements,
	getAnnouncementById,
	updateAnnouncement,
	deleteAnnouncement,
} from "../controller/announcementcontroller.js";

const router = express.Router();

// Create a new announcement
router.post("/", createAnnouncement);

// Get all announcements
router.get("/", getAllAnnouncements);

// Get a single announcement by ID
router.get("/:id", getAnnouncementById);

// Update an announcement by ID
router.put("/:id", updateAnnouncement);

// Delete an announcement by ID
router.delete("/:id", deleteAnnouncement);

export default router;
