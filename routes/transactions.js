const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction"); // Adjust the model path if needed

// GET /api/transactions - List all transactions with search, pagination & month filter
router.get("/", async (req, res) => {
  try {
    let { search, page = 1, perPage = 10, month } = req.query;
    page = parseInt(page);
    perPage = parseInt(perPage);

    let filter = {};

    // Search filter (title, description, price)
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { price: !isNaN(search) ? parseFloat(search) : undefined }
      ];
    }

    // Month filter (ignores year)
    if (month) {
      const monthRegex = new RegExp(`-${month}-`, "i");
      filter.dateOfSale = { $regex: monthRegex };
    }

    // Fetch transactions with pagination
    const transactions = await Transaction.find(filter)
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalRecords = await Transaction.countDocuments(filter);

    res.json({
      page,
      perPage,
      totalRecords,
      transactions
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
