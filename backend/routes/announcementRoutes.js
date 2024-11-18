import express from "express";
import {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controller/announcementcontroller.js";

const router = express.Router();

router.post("/", createAnnouncement); // Create a new announcement
router.get("/", getAllAnnouncements); // Get all announcements
router.get("/:id", getAnnouncementById); // Get a single announcement by ID
router.put("/:id", updateAnnouncement); // Update an announcement by ID
router.delete("/:id", deleteAnnouncement); // Delete an announcement by ID

export default router;
