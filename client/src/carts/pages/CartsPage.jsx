import React, { useCallback, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeader";
import CartFeedback from "../components/CartFeedback";
import useCarts from "../hooks/useCarts";
import { Box } from "@mui/material";

const CartsPage = () => {
  const {
    value,
    handleChangeAmounts,
    handleEmptyCart,
    handleRemoveFromCart,
    handleGetCartProducts,
  } = useCarts();

  useEffect(() => {
    handleGetCartProducts();
  }, []);

  const onUpdateProduct = useCallback(
    async (productId, amount) => {
      await handleChangeAmounts(productId, amount);
      await handleGetCartProducts();
    },
    [handleChangeAmounts, handleGetCartProducts]
  );

  const onRemoveProduct = useCallback(
    async (productId) => {
      await handleRemoveFromCart(productId);
      await handleGetCartProducts();
    },
    [handleGetCartProducts, handleRemoveFromCart]
  );

  const onEmptyCart = useCallback(async () => {
    await handleEmptyCart();
    await handleGetCartProducts();
  }, [handleEmptyCart, handleGetCartProducts]);

  return (
    <Box pt={6}>
      <CartFeedback
        isLoading={value.isLoading}
        error={value.error}
        products={value.fullProductList}
        onUpdate={onUpdateProduct}
        onRemove={onRemoveProduct}
        onEmpty={onEmptyCart}
      />
    </Box>
  );
};

export default CartsPage;
