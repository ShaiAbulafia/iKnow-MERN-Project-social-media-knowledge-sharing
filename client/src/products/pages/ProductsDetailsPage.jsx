import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import useProducts from "../hooks/useProducts";
import ProductFeedback from "../components/ProductFeedback";
import { Box } from "@mui/material";

const ProductsDetailsPage = () => {
  const { id } = useParams();
  const { valueProduct, ...rest } = useProducts();

  useEffect(() => {
    rest.handleGetProduct(id);
  }, []);
  const onChangeProductNum = useCallback(
    (productNum, productId) => {
      rest.handleChangeProductNumber(productNum, productId);
      rest.handleGetProduct(productId);
    },
    [rest]
  );

  return (
    <Box pt={6}>
      <ProductFeedback
        product={valueProduct.product}
        isLoading={valueProduct.isLoading}
        error={valueProduct.error}
        onChangeProductNum={onChangeProductNum}
      />
    </Box>
  );
};

export default ProductsDetailsPage;
