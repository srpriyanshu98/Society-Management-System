// routes/otherIncomeRoutes.js
import express from "express";
import {
  addOtherIncome,
  getAllOtherIncome,
  getOtherIncomeById,
  updateOtherIncome,
  deleteOtherIncome,
} from "../controller/otherIncomecontroller.js";

const router = express.Router();

router.post("/", addOtherIncome); // Create
router.get("/", getAllOtherIncome); // Read all
router.get("/:id", getOtherIncomeById); // Read by ID
router.put("/:id", updateOtherIncome); // Update
router.delete("/:id", deleteOtherIncome); // Delete

export default router;
