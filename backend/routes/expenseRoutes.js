// routes/expenseRoutes.js
import express from "express";
import upload from "../middleware/upload.js";
import {
  addExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../controller/expensecontroller.js";

const router = express.Router();

router.post("/", upload.single("bill"), addExpense); // Create with file upload
router.get("/", getAllExpenses); // Read all
router.get("/:id", getExpenseById); // Read by ID
router.put("/:id", upload.single("bill"), updateExpense); // Update with optional file upload
router.delete("/:id", deleteExpense); // Delete

export default router;
