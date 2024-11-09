import express from "express";
import {
  createSecurityProtocol,
  getAllSecurityProtocols,
  getSecurityProtocolById,
  updateSecurityProtocol,
  deleteSecurityProtocol,
} from "../controller/securityProtocolcontroller.js";

const router = express.Router();

// Create a new security protocol
router.post("/", createSecurityProtocol);

// Get all security protocols
router.get("/", getAllSecurityProtocols);

// Get a single security protocol by ID
router.get("/:id", getSecurityProtocolById);

// Update a security protocol by ID
router.put("/:id", updateSecurityProtocol);

// Delete a security protocol by ID
router.delete("/:id", deleteSecurityProtocol);

export default router;
