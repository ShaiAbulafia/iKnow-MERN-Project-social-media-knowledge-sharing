const mongoose = require("mongoose");
const Product = require("./Product");

const Products = new mongoose.Schema({
  product: Product,
  amount: {
    type: Number,
    trim: true,
    min: 1,
  },
});

module.exports = Products;
