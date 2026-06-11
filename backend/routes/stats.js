const express = require("express")
const router = express.Router();
const Expense = require("../models/Expense");
const User = require("../models/User")

router.get("/", async (req, res) => {
  try {
    const [totalUsers, totalExpenses, amountResult] = await Promise.all([
      User.countDocuments(),
      Expense.countDocuments(),
      Expense.aggregate([
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
          },
        },
      ]),
    ]);

    const totalAmount = amountResult.length > 0 ? amountResult[0].totalAmount : 0;

    res.status(200).json({
      totalUsers,
      totalExpenses,
      totalAmount,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch stats",
      error: error.message,
    });
  }
});

module.exports = router;
