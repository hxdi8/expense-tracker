const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  username: String,
  type: String,
  amount: Number,
  description: String,
  category: String,
  date: Date,
});

module.exports = mongoose.model("Expense", expenseSchema);
