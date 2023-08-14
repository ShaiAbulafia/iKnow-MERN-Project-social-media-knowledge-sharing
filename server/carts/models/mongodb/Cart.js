const mongoose = require("mongoose");
const Products = require("./Products");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [Products],
  active: { type: Boolean, default: false },
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
