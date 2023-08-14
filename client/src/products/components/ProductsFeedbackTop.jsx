import React from "react";
import { arrayOf, string, bool, func } from "prop-types";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import Products from "./Products";
import Typography from "@mui/material/Typography";
import productType from "../models/types/productType";
import { Paper } from "@mui/material";
import { useTheme } from "../../providers/ThemeProvider";

const ProductsFeedbackTop = ({
  isLoading,
  error,
  products,
  onDelete,
  onWish,
}) => {
  const { isDark } = useTheme();

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (products && !products.length)
    return (
      <>
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
        <Products
          products={products
            .sort((a, b) => {
              return b.wishes.length - a.wishes.length;
            })
            .slice(0, 4)}
          onDelete={onDelete}
          onWish={onWish}
        />
      </>
    );
  return null;
};

ProductsFeedbackTop.propTypes = {
  products: arrayOf(productType),
  isLoading: bool.isRequired,
  error: string,
  onDelete: func.isRequired,
  onWish: func.isRequired,
};
ProductsFeedbackTop.defaultProps = {
  onWish: () => {},
};

export default ProductsFeedbackTop;
