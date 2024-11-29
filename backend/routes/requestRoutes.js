import express from "express";
import {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
  getRequests,
} from "../controller/requestcontroller.js";
import { admin, verifyToken } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createRequest); // Create a new request
router.get("/", getAllRequests); // Get all requests
router.get("/:id", getRequestById); // Get a single request by ID
router.put("/:id", updateRequest); // Update a request by ID
router.delete("/:id", deleteRequest); // Delete a request by ID
router.get("/getRequests/:id", getRequests); // Get all requests

export default router;
