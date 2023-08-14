import React, { useEffect, useCallback } from "react";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeader";
import ProductsFeedback from "../components/ProductsFeedback";
import useProducts from "../hooks/useProducts";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";
import { Box } from "@mui/material";

const ProductsPage = () => {
  const { valueProduct, handleGetProducts, handleDeleteProduct } =
    useProducts();

  useEffect(() => {
    handleGetProducts();
  }, []);

  const onDeleteProduct = useCallback(
    async (productId) => {
      await handleDeleteProduct(productId);
      await handleGetProducts();
    },
    [handleDeleteProduct, handleGetProducts]
  );

  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <Box pt={6}>
      {user && user.isAdmin && (
        <Fab
          onClick={() => navigate(ROUTES.CREATE_PRODUCT)}
          color="forthColor"
          aria-label="add"
          sx={{
            position: "fixed",
            bottom: 100,
            right: 20,
          }}
        >
          <AddIcon sx={{ color: "secondColor.main" }} />
        </Fab>
      )}
      <ProductsFeedback
        isLoading={valueProduct.isLoading}
        products={valueProduct.filteredProducts}
        error={valueProduct.error}
        onDelete={onDeleteProduct}
      />
    </Box>
  );
};

export default ProductsPage;
