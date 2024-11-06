import express from "express";
import {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
} from "../controller/requestcontroller.js";

const router = express.Router();

// Create a new request
router.post("/", createRequest);

// Get all requests
router.get("/", getAllRequests);

// Get a single request by ID
router.get("/:id", getRequestById);

// Update a request by ID
router.put("/:id", updateRequest);

// Delete a request by ID
router.delete("/:id", deleteRequest);

export default router;
