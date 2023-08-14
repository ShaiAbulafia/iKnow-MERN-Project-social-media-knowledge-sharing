import React from "react";
import productType from "../../models/types/productType";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

const PaperHeader = ({ product }) => {
  return (
    <>
      <Typography
        variant="h6"
        align="center"
        color="text.secondary"
        paddingTop={2}
        sx={{ fontWeight: 900 }}
      >
        Product number: {product.productNumber}
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <Typography
        variant="h3"
        align="center"
        color="text.secondary"
        sx={{ fontWeight: 900 }}
      >
        {product.title}
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        paddingTop={2}
        sx={{ fontWeight: 900 }}
      >
        {product.subtitle}
      </Typography>
      <Divider sx={{ marginY: 1 }} />
    </>
  );
};

PaperHeader.propTypes = {
  product: productType.isRequired,
};

export default PaperHeader;
