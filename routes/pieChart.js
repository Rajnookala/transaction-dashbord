const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// GET /api/pie-chart - Get category-wise item count for a selected month
router.get("/", async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ error: "Month parameter is required" });
    }

    const monthRegex = new RegExp(`-${month}-`, "i");

    // Fetch transactions for the selected month
    const transactions = await Transaction.find({ dateOfSale: { $regex: monthRegex } });

    // Categorize transactions by product category
    const categoryCounts = {};

    transactions.forEach(t => {
      if (categoryCounts[t.category]) {
        categoryCounts[t.category]++;
      } else {
        categoryCounts[t.category] = 1;
      }
    });

    res.json({ month, categoryCounts });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
