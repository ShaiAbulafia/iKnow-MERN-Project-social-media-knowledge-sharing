import React from "react";
import productType from "../../models/types/productType";
import PaperHeader from "./PaperHeader";
import PaperBody from "./PaperBody";
import PaperImage from "./PaperImage";
import { Paper as MuiPaper } from "@mui/material";
import { useTheme } from "../../../providers/ThemeProvider";

const Paper = ({ product }) => {
  const { isDark } = useTheme();
  return (
    <>
      <MuiPaper
        elevation={3}
        sx={{
          border: 2,
          borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
          backgroundColor: isDark ? "" : "thirdColor.main",
        }}
        style={{
          paddingLeft: 50,
          paddingRight: 50,
          paddingBottom: 20,
        }}
      >
        <PaperHeader product={product} />
        <PaperImage product={product} />
        <PaperBody product={product} />
      </MuiPaper>
    </>
  );
};

Paper.propTypes = {
  product: productType.isRequired,
};

export default Paper;
