const express = require("express");
const Expense = require("../models/Expense");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save expense" });
  }
});

router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find({ username: req.query.username });
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const filter = { _id: req.params.id };

    if (req.query.username) {
      filter.username = req.query.username;
    }

    const expense = await Expense.findOneAndDelete(filter);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete expense" });
  }
});

module.exports = router;
