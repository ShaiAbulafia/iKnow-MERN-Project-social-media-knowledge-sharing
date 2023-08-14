import React, { useState } from "react";
import { string, bool, arrayOf } from "prop-types";
import Spinner from "../../../components/Spinner";
import Error from "../../../components/Error";
import Typography from "@mui/material/Typography";
import { useTheme } from "../../../providers/ThemeProvider";
import productType from "../../../products/models/types/productType";
import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import ProductsSearchBar from "./ProductsSearchBar";

const ProductAnalayze = ({ products, isLoading, error }) => {
  const { isDark } = useTheme();
  const [countProducts, setCount] = useState(5);

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (!products || !products.length)
    return (
      <>
        <ProductsSearchBar countProducts={countProducts} setCount={setCount} />
        <Paper
          elevation={3}
          sx={{
            mt: 3,
            border: 2,
            borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
            backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
          }}
          style={{
            padding: 50,
          }}
        >
          <Typography variant="h5" textAlign="center">
            Oops.. cant find products in database!
          </Typography>
        </Paper>
      </>
    );

  return (
    <>
      <ProductsSearchBar countProducts={countProducts} setCount={setCount} />

      <TableContainer component={Paper} sx={{ marginTop: 3 }} elevation={3}>
        <Table
          sx={{
            tableLayout: "fixed",
            minWidth: 500,
            border: 3,
            borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
            backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
          }}
          aria-label="Users table"
        >
          <TableHead />
          <TableBody>
            {products
              .sort((a, b) => {
                return b.wishes.length - a.wishes.length;
              })
              .slice(0, countProducts)
              .map((product) => (
                <TableRow key={product._id} product={product} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

ProductAnalayze.propTypes = {
  products: arrayOf(productType),
  isLoading: bool.isRequired,
  error: string,
};

export default ProductAnalayze;
