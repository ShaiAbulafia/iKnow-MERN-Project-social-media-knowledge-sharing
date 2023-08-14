import React from "react";
import MuiCard from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardBody from "./CardBody";
import CardActionBar from "./CardActionBar";
import CardImage from "./CardImage";
import { func } from "prop-types";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import productType from "../../models/types/productType";
import { useTheme } from "../../../providers/ThemeProvider";
import { useUser } from "../../../users/providers/UserProvider";

const Card = ({ product, onDelete, onWish }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <MuiCard
      elevation={3}
      sx={{
        minWidth: 280,
        border: 2,
        borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
      }}
    >
      <CardActionArea
        onClick={() => navigate(`${ROUTES.PRODUCTS}/${product._id}`)}
      >
        <CardImage image={product.image} />
        <CardBody product={product} />
      </CardActionArea>
      {user && (
        <CardActionBar
          productId={product._id}
          onDelete={onDelete}
          onWish={onWish}
          productWishes={product.wishes}
          stock={product.stock}
        />
      )}
    </MuiCard>
  );
};

Card.propTypes = {
  product: productType.isRequired,
  onDelete: func.isRequired,
  onWish: func.isRequired,
};

export default Card;
