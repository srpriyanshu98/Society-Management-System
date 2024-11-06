import express from "express";
import upload from "../middleware/upload.js";
import {
  createTenant,
  getTenants,
  getTenantById,
  updateTenant,
  deleteTenant,
} from "../controller/tenantcontroller.js";

const router = express.Router();

const uploadFields = [
  { name: "aadharCardFront", maxCount: 1 },
  { name: "aadharCardBack", maxCount: 1 },
  { name: "addressProof", maxCount: 1 },
  { name: "rentAgreement", maxCount: 1 },
];

router.post("/", upload.fields(uploadFields), createTenant); // Create a new tenant
router.get("/", getTenants); // Get all tenants
router.get("/:id", getTenantById); // Get a tenant by ID
router.put("/:id", upload.fields(uploadFields), updateTenant); // Update a tenant by ID
router.delete("/:id", deleteTenant); // Delete a tenant by ID

export default router;
