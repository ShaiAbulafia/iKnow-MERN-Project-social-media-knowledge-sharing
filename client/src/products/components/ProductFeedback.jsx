import React from "react";
import { string, bool, func } from "prop-types";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import Typography from "@mui/material/Typography";
import productType from "../models/types/productType";
import Paper from "./paper/Paper";
import { useUser } from "../../users/providers/UserProvider";
import AdminPaper from "./paper/AdminPaper";
import { useTheme } from "../../providers/ThemeProvider";

const ProductFeedback = ({ isLoading, error, product, onChangeProductNum }) => {
  const { user } = useUser();

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;

  if (!product)
    return (
      <Typography variant="body1">
        Oops.. cant find the product in database that you were looking for!
      </Typography>
    );
  if (product)
    return (
      <>
        {user && user.isAdmin && (
          <AdminPaper
            productId={product._id}
            onChangeProductNum={onChangeProductNum}
          />
        )}
        <Paper product={product} onChangeProductNum={onChangeProductNum} />
      </>
    );
  return null;
};

ProductFeedback.propTypes = {
  product: productType,
  isLoading: bool.isRequired,
  error: string,
  onChangeProductNum: func.isRequired,
};

export default ProductFeedback;
