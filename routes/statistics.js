const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// GET /api/statistics - Get sales statistics for a specific month
router.get("/", async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ error: "Month parameter is required" });
    }

    const monthRegex = new RegExp(`-${month}-`, "i");

    // Fetch transactions for the selected month
    const transactions = await Transaction.find({ dateOfSale: { $regex: monthRegex } });

    // Calculate statistics
    const totalSaleAmount = transactions.reduce((sum, t) => sum + t.price, 0);
    const totalSoldItems = transactions.filter(t => t.sold).length;
    const totalNotSoldItems = transactions.length - totalSoldItems;

    res.json({
      month,
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
