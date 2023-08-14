import { useCallback, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";
import PageHeader from "../../components/PageHeader";
import ProductsFeedback from "../components/ProductsFeedback";
import useProducts from "../hooks/useProducts";
import { Box } from "@mui/material";

const WishProductsPage = () => {
  const { user } = useUser();
  const { valueProduct, ...rest } = useProducts();

  useEffect(() => {
    rest.handleGetWishProducts();
  }, []);

  const onDeleteProduct = useCallback(
    async (productId) => {
      await rest.handleDeleteProduct(productId);
      await rest.handleGetWishProducts();
    },
    [rest]
  );

  const changeWishStatus = useCallback(async () => {
    await rest.handleGetWishProducts();
  }, [rest]);

  if (!user) return <Navigate replace to={ROUTES.PRODUCTS} />;

  return (
    <Box pt={6}>
      <ProductsFeedback
        isLoading={valueProduct.isLoading}
        products={valueProduct.filteredProducts}
        error={valueProduct.error}
        onDelete={onDeleteProduct}
        onWish={changeWishStatus}
      />
    </Box>
  );
};

export default WishProductsPage;
