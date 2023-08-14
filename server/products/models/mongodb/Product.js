const mongoose = require("mongoose");
const Image = require("./Image");
const { DEFAULT_VALIDATION } = require("../../helpers/mongooseValidators");

const productSchema = new mongoose.Schema({
  title: DEFAULT_VALIDATION,
  subtitle: DEFAULT_VALIDATION,
  category: DEFAULT_VALIDATION,
  brand: DEFAULT_VALIDATION,
  description: {
    ...DEFAULT_VALIDATION,
    maxLength: 1024,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  stock: {
    type: Number,
    required: true,
  },
  image: Image,
  productNumber: {
    type: Number,
    minLength: 7,
    maxLength: 7,
    required: true,
  },
  wishes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
