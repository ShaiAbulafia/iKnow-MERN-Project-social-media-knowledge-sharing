import React, { useState } from "react";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Grid, Button, Typography, IconButton, TextField } from "@mui/material";
import { func, string, arrayOf, number } from "prop-types";
import { useUser } from "../../../users/providers/UserProvider";
import CardDeleteDialog from "./CardDeleteDialog";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import useProducts from "../../hooks/useProducts";
import useCarts from "../../../carts/hooks/useCarts";
import { useTheme } from "../../../providers/ThemeProvider";
import CakeIcon from "@mui/icons-material/Cake";
import Tooltip from "@mui/material/Tooltip";

const CardActionBar = ({
  productId,
  stock,
  onDelete,
  onWish,
  productWishes,
}) => {
  const { user } = useUser();
  const { isDark } = useTheme();
  const [isDialogOpen, setDialog] = useState(false);
  const { handleWishProduct } = useProducts();
  const { handleUpdateCart } = useCarts();
  const [isWished, setWish] = useState(() => {
    if (!user) return false;
    return !!productWishes.find((id) => id === user._id);
  });
  const [quant, setQuant] = useState(1);
  const navigate = useNavigate();

  const handleDialog = (term) => {
    if (term === "open") return setDialog(true);
    setDialog(false);
  };

  const handleWish = async () => {
    setWish((prev) => !prev);
    await handleWishProduct(productId);
    onWish();
  };

  const handleDelete = async () => {
    handleDialog();
    await onDelete(productId);
  };

  const disabled = () => {
    if (stock <= 0) return true;
    return false;
  };

  return (
    <>
      <CardActions
        sx={{
          py: 1,
          m: 0,
          backgroundColor: isDark ? "darkModeColor.main" : "forthColor.main",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} textAlign="center">
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
                backgroundColor: isDark
                  ? "darkModeColor.main"
                  : "secondColor.main",
                borderRadius: 1,
                width: 60,
              }}
              InputProps={{ inputProps: { min: 1, max: stock } }}
              onChange={(e) => setQuant(e.target.valueAsNumber)}
            />

            <IconButton
              disabled={disabled()}
              aria-label="add to cart!"
              color={isDark ? "" : "secondColor"}
              sx={{ mx: 1, my: 0.5, p: 0 }}
              onClick={() => handleUpdateCart(productId, quant)}
            >
              <AddShoppingCartIcon fontSize="large" />
            </IconButton>

            <Tooltip title="add to wishes!">
              <IconButton
                aria-label="add to wishes!"
                sx={{ my: 0.5, p: 0 }}
                onClick={handleWish}
              >
                <CakeIcon
                  fontSize="large"
                  color={isWished ? "primary" : "inherit"}
                />
              </IconButton>
            </Tooltip>
          </Grid>
          {user && user.isAdmin && (
            <>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={() => handleDialog("open")}
                >
                  <DeleteIcon />
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="thirdColor"
                  fullWidth
                  onClick={() =>
                    navigate(`${ROUTES.EDIT_PRODUCT}/${productId}`)
                  }
                >
                  <EditIcon sx={{ color: "white" }} />
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </CardActions>
      <CardDeleteDialog
        isDialogOpen={isDialogOpen}
        onChangeDialog={handleDialog}
        onDelete={handleDelete}
      />
    </>
  );
};

CardActionBar.propTypes = {
  productId: string.isRequired,
  onDelete: func.isRequired,
  onWish: func.isRequired,
  productWishes: arrayOf(string).isRequired,
  stock: number.isRequired,
};

export default CardActionBar;
