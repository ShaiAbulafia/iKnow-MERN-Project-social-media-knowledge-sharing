import React from "react";
import productType from "../../models/types/productType";
import CardMedia from "@mui/material/CardMedia";
import { useTheme } from "../../../providers/ThemeProvider";

const PaperImage = ({ product }) => {
  const { isDark } = useTheme();
  return (
    <CardMedia
      component="img"
      image={product.image.url}
      alt={product.image.alt}
      sx={{
        maxHeight: "500px",
        border: 2,
        borderRadius: 2,
        borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
        backgroundColor: isDark ? "" : "white",
      }}
    />
  );
};

PaperImage.propTypes = {
  product: productType.isRequired,
};

export default PaperImage;
