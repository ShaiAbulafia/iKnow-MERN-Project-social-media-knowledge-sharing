import React from "react";
import { Typography, Grid, Divider } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import productType from "../../models/types/productType";
import { useTheme } from "../../../providers/ThemeProvider";
import CardHeader from "@mui/material/CardHeader";

const CardBody = ({ product }) => {
  const { isDark } = useTheme();

  return (
    <>
      <CardContent
        sx={{
          p: 0,
          m: 0,
          pb: 1,
          borderTop: 3,
          borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
          backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <CardHeader
              sx={{ p: 0, m: 0 }}
              title={
                <Typography
                  variant="h4"
                  align="center"
                  color={"text.secondary"}
                  fontWeight={700}
                >
                  {product.title}
                </Typography>
              }
              subheader={
                <Typography
                  variant="h6"
                  align="center"
                  color={"text.secondary"}
                  fontWeight={600}
                >
                  {product.subtitle}
                </Typography>
              }
            />
            <Divider sx={{ my: 1 }} />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              align="center"
              fontWeight={700}
              color="primary"
            >
              {product.price * 100} K-Points
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              align="center"
              fontWeight={700}
              color="text.secondary"
            >
              or
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              align="center"
              fontWeight={700}
              color="success.main"
            >
              {product.price}$
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            {product.stock > 0 && (
              <Typography variant="body1" align="center" color="text.secondary">
                <Typography variant="body1" fontWeight={700} component="span">
                  Stock:{" "}
                </Typography>
                {product.stock}
              </Typography>
            )}
            {product.stock <= 0 && (
              <Typography
                variant="body1"
                fontWeight={700}
                align="center"
                color="error"
              >
                Out of stock!
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
};
CardBody.propTypes = {
  product: productType.isRequired,
};

export default CardBody;
