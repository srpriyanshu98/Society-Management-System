import express from "express";
import upload from "../middleware/upload.js";
import {
  createOwner,
  getOwners,
  getOwnerById,
  updateOwner,
  deleteOwner,
} from "../controller/residentcontroller.js";

const router = express.Router();

// Fields for file upload
const uploadFields = [
  { name: "aadharCardFront", maxCount: 1 },
  { name: "aadharCardBack", maxCount: 1 },
  { name: "addressProof", maxCount: 1 },
  { name: "rentAgreement", maxCount: 1 },
];

router.post("/", upload.fields(uploadFields), createOwner); // Create a new owner
router.get("/", getOwners); // Get all owners
router.get("/:id", getOwnerById); // Get an owner by ID
router.put("/:id", upload.fields(uploadFields), updateOwner); // Update an owner by ID
router.delete("/:id", deleteOwner); // Delete an owner by ID

export default router;
