const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  sold: Boolean,
  image: String,
  dateOfSale: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
