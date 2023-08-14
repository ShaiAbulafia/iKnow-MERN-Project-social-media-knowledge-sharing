import React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import MoreButton from "./MoreButton";
import Logged from "./Logged";
import NotLogged from "./NotLogged";
import { useUser } from "../../../../users/providers/UserProvider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Typography } from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../../routes/routesModel";
import { useCart } from "../../../../carts/providers/CartProvider";
import Notifications from "./Notifications";

const RightNavBar = () => {
  const { user, kPoints } = useUser();
  const { curCart } = useCart();
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          display: "inline-flex",
        }}
      >
        {user && (
          <>
            <Box sx={{ display: "" }}>
              <Typography
                variant="h7"
                component="span"
                color="text.secondary"
                fontWeight={700}
              >
                K-Points
              </Typography>
              <Typography
                variant="h5"
                textAlign="center"
                fontWeight={700}
                color="primary"
              >
                {kPoints}
              </Typography>
            </Box>

            <IconButton
              sx={{ marginLeft: 1 }}
              onClick={() => navigate(ROUTES.WISH_PRODUCTS)}
            >
              <CakeIcon fontSize="large" />
            </IconButton>
            {curCart && (
              <IconButton
                sx={{ marginLeft: 1 }}
                onClick={() => navigate(ROUTES.CART)}
              >
                <Badge badgeContent={curCart.products.length} color="success">
                  <ShoppingCartIcon
                    fontSize="large"
                    color={curCart.active ? "primary" : "inherit"}
                  />
                </Badge>
              </IconButton>
            )}

            <Notifications />
          </>
        )}
        <Box
          sx={{
            display: { xs: "none", md: "inline-flex" },
            alignItems: "center",
          }}
        >
          {!user && <NotLogged />}

          {user && <Logged />}
        </Box>
        <Box
          sx={{
            display: { xs: "inline-flex", md: "none" },
            alignItems: "center",
          }}
        >
          <MoreButton />
        </Box>
      </Box>
    </>
  );
};

export default RightNavBar;
