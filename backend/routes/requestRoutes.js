import express from "express";
import {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
} from "../controller/requestcontroller.js";

const router = express.Router();

router.post("/", createRequest); // Create a new request
router.get("/", getAllRequests); // Get all requests
router.get("/:id", getRequestById); // Get a single request by ID
router.put("/:id", updateRequest); // Update a request by ID
router.delete("/:id", deleteRequest); // Delete a request by ID

export default router;
