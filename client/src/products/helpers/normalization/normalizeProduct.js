const normalizeProduct = (product) => {
  return {
    title: product.title,
    subtitle: product.subtitle,
    category: product.category,
    brand: product.brand,
    description: product.description,
    price: product.price,
    stock: product.stock,
    image: { url: product.imageUrl, alt: product.imageAlt },
  };
};
export default normalizeProduct;
