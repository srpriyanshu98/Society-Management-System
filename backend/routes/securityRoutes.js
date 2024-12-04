import express from "express";
import upload from "../middleware/upload.js";

import {
  createSecurity,
  getAllSecurityRecords,
  getSecurityById,
  updateSecurity,
  deleteSecurity,
  loginSecurity,
} from "../controller/securitycontroller.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "guardPhoto", maxCount: 1 },
    { name: "aadharCard", maxCount: 1 },
  ]),
  createSecurity
); // Create a new security record with file upload
router.get("/", getAllSecurityRecords); // Get all security records
router.get("/:id", getSecurityById); // Get a single security record by ID
router.put("/:id", updateSecurity); // Update a security record by ID
router.delete("/:id", deleteSecurity); // Delete a security record by ID
router.post("/login", loginSecurity);

export default router;
