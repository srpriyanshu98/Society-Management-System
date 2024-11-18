import express from "express";
import {
  createSecurityProtocol,
  getAllSecurityProtocols,
  getSecurityProtocolById,
  updateSecurityProtocol,
  deleteSecurityProtocol,
} from "../controller/securityProtocolcontroller.js";

const router = express.Router();

router.post("/", createSecurityProtocol); // Create a new security protocol
router.get("/", getAllSecurityProtocols); // Get all security protocols
router.get("/:id", getSecurityProtocolById); // Get a single security protocol by ID
router.put("/:id", updateSecurityProtocol); // Update a security protocol by ID
router.delete("/:id", deleteSecurityProtocol); // Delete a security protocol by ID

export default router;
