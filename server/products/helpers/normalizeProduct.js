const generateProductNumber = require("./generateProductNumber");

const normalizeProduct = async (rawProduct) => {
  const { url, alt } = rawProduct.image;
  const image = {
    url: url,
    alt: alt,
  };
  return {
    ...rawProduct,
    image,
    productNumber: rawProduct.productNumber || (await generateProductNumber()),
  };
};

module.exports = normalizeProduct;
