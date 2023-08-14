import { Grid, Typography } from "@mui/material";
import { arrayOf, func } from "prop-types";
import React from "react";
import productType from "../models/types/productType";
import Card from "./card/Card";
import { animated, useTransition } from "react-spring";
const Products = ({ products, onDelete, onWish }) => {
  const transition = useTransition(products, {
    from: {
      opacity: 0,
      y: "-10%",
    },
    enter: {
      opacity: 1,
      y: "0%",
    },
    trail: 200,
  });

  return (
    <>
      <Grid container spacing={4}>
        {transition((style, product) => (
          <Grid item key={product._id} pb={2} xs={12} sm={6} md={4} lg={3}>
            <animated.div style={style}>
              <Card product={product} onDelete={onDelete} onWish={onWish} />
            </animated.div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

Products.propTypes = {
  products: arrayOf(productType).isRequired,
  onDelete: func.isRequired,
  onWish: func.isRequired,
};
export default Products;
