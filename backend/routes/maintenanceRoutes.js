import express from "express";
import {
	addMaintenance,
	getAllMaintenance,
} from "../controller/maintenancecontroller.js";

const router = express.Router();

router.post("/", addMaintenance); // Create
router.get("/", getAllMaintenance); // Read all

export default router;
