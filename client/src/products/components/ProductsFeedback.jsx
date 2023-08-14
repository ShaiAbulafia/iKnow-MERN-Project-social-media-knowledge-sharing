import React from "react";
import { arrayOf, string, bool, func } from "prop-types";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import Products from "./Products";
import Typography from "@mui/material/Typography";
import productType from "../models/types/productType";
import { Paper } from "@mui/material";
import { useTheme } from "../../providers/ThemeProvider";
import ProductsSearchBar from "./ProductsSearchBar";

const ProductsFeedback = ({ isLoading, error, products, onDelete, onWish }) => {
  const { isDark } = useTheme();

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (products && !products.length)
    return (
      <>
        <ProductsSearchBar />
        <Paper
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
            Oops.. there are no products in database that match the parameters
            you entered!
          </Typography>
        </Paper>
      </>
    );
  if (products)
    return (
      <>
        <ProductsSearchBar />
        <Products products={products} onDelete={onDelete} onWish={onWish} />
      </>
    );
  return null;
};

ProductsFeedback.propTypes = {
  products: arrayOf(productType),
  isLoading: bool.isRequired,
  error: string,
  onDelete: func.isRequired,
  onWish: func.isRequired,
};
ProductsFeedback.defaultProps = {
  onWish: () => {},
};

export default ProductsFeedback;
