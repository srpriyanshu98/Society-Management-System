import express from "express";
import upload from "../middleware/upload.js";
import {
	createResident,
	getResident,
	getResidentById,
	updateResident,
	deleteResident,
} from "../controller/residentcontroller.js";

const router = express.Router();

// Fields for file upload
const uploadFields = [
	{ name: "aadharCardFront", maxCount: 1 },
	{ name: "aadharCardBack", maxCount: 1 },
	{ name: "addressProof", maxCount: 1 },
	{ name: "rentAgreement", maxCount: 1 },
];

router.post("/", upload.fields(uploadFields), createResident); // Create a new owner
router.get("/", getResident); // Get all owners
router.get("/:id", getResidentById); // Get an owner by ID
router.put("/:id", upload.fields(uploadFields), updateResident); // Update an owner by ID
router.delete("/:id", deleteResident); // Delete an owner by ID

export default router;
