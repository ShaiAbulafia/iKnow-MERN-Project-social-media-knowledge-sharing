const Product = require("../models/mongodb/Product");
const lodash = require("lodash");
const { handleBadRequest } = require("../../utils/handleErrors");

const generateProductNumber = async () => {
  try {
    const random = lodash.random(1_000_000, 9_999_999);
    const product = await Product.findOne(
      { productNumber: random },
      { productNumber: 1, _id: 0 }
    );
    if (product) return generateProductNumber();
    return random;
  } catch (error) {
    return handleBadRequest("generateProductNumber", error);
  }
};

module.exports = generateProductNumber;
