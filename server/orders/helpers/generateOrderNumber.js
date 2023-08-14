const Order = require("../models/mongodb/Order");
const lodash = require("lodash");
const { handleBadRequest } = require("../../utils/handleErrors");

const generateOrderNumber = async () => {
  try {
    const random = lodash.random(1_000_000, 9_999_999);
    const product = await Order.findOne(
      { orderNumber: random },
      { orderNumber: 1, _id: 0 }
    );
    if (product) return generateOrderNumber();
    return random;
  } catch (error) {
    return handleBadRequest("generateOrderNumber", error);
  }
};

module.exports = generateOrderNumber;
