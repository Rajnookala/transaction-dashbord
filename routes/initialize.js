const express = require("express");
const axios = require("axios");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.get("/initialize", async (req, res) => {
  try {
    const response = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
    const transactions = response.data;

    await Transaction.deleteMany(); // Clear existing data
    await Transaction.insertMany(transactions); // Insert new data

    res.json({ message: "Database initialized successfully", totalRecords: transactions.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to initialize database" });
  }
});

module.exports = router;
