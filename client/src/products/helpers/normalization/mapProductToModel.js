const mapProductToModel = (product) => {
  return {
    title: product.title,
    subtitle: product.subtitle,
    category: product.category,
    brand: product.brand,
    description: product.description,
    price: product.price,
    stock: product.stock,
    imageUrl: product.image.url,
    imageAlt: product.image.alt,
  };
};

export default mapProductToModel;
