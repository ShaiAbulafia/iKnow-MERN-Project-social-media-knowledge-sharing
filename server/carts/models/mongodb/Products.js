const mongoose = require("mongoose");

const Products = new mongoose.Schema({
  productId: {
    type: String,
  },
  amount: {
    type: Number,
    trim: true,
    min: 1,
  },
});

module.exports = Products;
