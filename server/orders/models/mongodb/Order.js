const mongoose = require("mongoose");
const Products = require("./Products");
const Address = require("../../../users/models/mongodb/Address");

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    minLength: 7,
    maxLength: 7,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  products: [Products],
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: { type: String, default: "New order" },
  orderAddress: Address,
  contactPhone: {
    type: String,
    required: true,
  },
  kPointsUsed: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
