import React, { useState } from "react";
import productType from "../../models/types/productType";
import { Grid, TextField, Typography, IconButton } from "@mui/material";
import { makeFirstLetterCapital } from "../../../utils/algoMethods";
import Divider from "@mui/material/Divider";
import { useTheme } from "../../../providers/ThemeProvider";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useCarts from "../../../carts/hooks/useCarts";
import { useUser } from "../../../users/providers/UserProvider";

const PaperBody = ({ product }) => {
  const { handleUpdateCart } = useCarts();
  const { isDark } = useTheme();
  const [quant, setQuant] = useState(1);
  const { user } = useUser();
  const disabled = () => {
    if (product.stock <= 0) return true;
    return false;
  };
  return (
    <>
      <Divider sx={{ marginY: 1 }} />
      <Grid container spacing={3} paddingLeft={2} paddingY={3}>
        <Grid item xs={12} md={8}>
          <Typography
            variant="h4"
            fontWeight={700}
            component="span"
            color="text.secondary"
          >
            Price:{" "}
          </Typography>
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary"
            component="span"
          >
            {product.price * 100} K-Points
          </Typography>
          <Typography
            variant="h4"
            fontWeight={700}
            component="span"
            color="text.secondary"
          >
            {" "}
            or{" "}
          </Typography>
          <Typography
            variant="h4"
            fontWeight={700}
            color="success.main"
            component="span"
          >
            {product.price}$
          </Typography>
        </Grid>
        {user && (
          <Grid item xs={12} md={4} textAlign="right">
            <Typography
              variant="h5"
              fontWeight={700}
              color="text.secondary"
              component="span"
            >
              Qt:{" "}
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              type="number"
              defaultValue={1}
              sx={{
                backgroundColor: isDark ? "darkModeColor.main" : "#fff",
                borderRadius: 1,
              }}
              InputProps={{ inputProps: { min: 1, max: product.stock } }}
              onChange={(e) => setQuant(e.target.valueAsNumber)}
            />
            <IconButton
              color={isDark ? "darkModeButton" : "primary"}
              disabled={disabled()}
              sx={{ mx: 1, my: 0.5, p: 0 }}
              onClick={() => handleUpdateCart(product._id, quant)}
            >
              <AddShoppingCartIcon fontSize="large" />
            </IconButton>
          </Grid>
        )}
      </Grid>
      <Divider sx={{ marginY: 1 }} />
      <Grid container spacing={3} paddingX={2} paddingY={3}>
        <Grid item xs={12}>
          <Typography variant="h5" color="text.secondary">
            <Typography variant="h5" fontWeight={700} component="span">
              Stock:{" "}
            </Typography>
            {product.stock}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" color="text.secondary">
            <Typography variant="h5" fontWeight={700} component="span">
              Category:{" "}
            </Typography>
            {makeFirstLetterCapital(product.category)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" color="text.secondary">
            <Typography variant="h5" fontWeight={700} component="span">
              Brand:{" "}
            </Typography>
            {makeFirstLetterCapital(product.brand)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" color="text.secondary">
            <Typography variant="h5" fontWeight={700} component="span">
              Description:{" "}
            </Typography>
            {makeFirstLetterCapital(product.description)}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

PaperBody.propTypes = {
  product: productType.isRequired,
};

export default PaperBody;
