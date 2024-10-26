import express from "express";
import {
  createSociety,
  getSocieties,
} from "../controller/societycontroller.js";

const router = express.Router();

router.post("/createSociety", createSociety); // Create a new society
router.get("/getSocieties", getSocieties); // Get all societies

export default router;
