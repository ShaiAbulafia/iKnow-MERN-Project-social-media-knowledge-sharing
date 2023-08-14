import React from "react";
import { string, bool, func, arrayOf } from "prop-types";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import Cart from "./Cart";
import { Typography, Paper } from "@mui/material";
import fullProductsList from "../models/types/fullProductsList";
import { useTheme } from "../../providers/ThemeProvider";

const CartFeedback = ({
  isLoading,
  error,
  products,
  onUpdate,
  onRemove,
  onEmpty,
}) => {
  const { isDark } = useTheme();
  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (products && !products.length)
    return (
      <Paper
        elevation={3}
        sx={{
          border: 2,
          borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
          backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
        }}
        style={{
          padding: 50,
        }}
      >
        <Typography variant="h5" textAlign="center">
          Oops.. there are no products in your cart Go to store and add the
          products you want to purchase!
        </Typography>
      </Paper>
    );
  if (products)
    return (
      <Cart
        products={products}
        onUpdate={onUpdate}
        onRemove={onRemove}
        onEmpty={onEmpty}
      />
    );
  return null;
};

CartFeedback.propTypes = {
  products: arrayOf(fullProductsList).isRequired,
  isLoading: bool.isRequired,
  error: string,
  onUpdate: func.isRequired,
  onRemove: func.isRequired,
  onEmpty: func.isRequired,
};

export default CartFeedback;
