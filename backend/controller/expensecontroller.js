import Expense from "../model/expensemodel.js";

// Add a new expense record
export const addExpense = async (req, res) => {
  try {
    const { title, description, date, amount } = req.body;
    const bill = req.file.path;

    const expense = new Expense({ title, description, date, amount, bill });
    await expense.save();
    res.status(201).json({ message: "Expense added successfully", expense });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding expense", error: error.message });
  }
};

// Get all expense records
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single expense record by ID
export const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an expense record by ID
export const updateExpense = async (req, res) => {
  try {
    const { title, description, date, amount } = req.body;
    const updateData = { title, description, date, amount };

    if (req.file) {
      updateData.bill = req.file.path; // Update bill if a new file is uploaded
    }

    const expense = await Expense.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense updated successfully", expense });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating expense", error: error.message });
  }
};

// Delete an expense record by ID
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
