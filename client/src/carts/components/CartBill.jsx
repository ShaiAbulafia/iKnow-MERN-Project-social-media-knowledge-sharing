import React from "react";
import { bool, number } from "prop-types";
import { Typography, Box, Grid } from "@mui/material";
import { useUser } from "../../users/providers/UserProvider";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CartBill = ({ totalPrice, useKP }) => {
  const { kPoints } = useUser();

  if (useKP)
    return (
      <Box my={2}>
        <Box>
          <Typography
            component="span"
            variant="h5"
            fontWeight={700}
            color="text.secondary"
          >
            Your K-Points:{" "}
            <Typography
              component="span"
              variant="h5"
              color="primary"
              fontWeight={700}
            >
              {kPoints}
            </Typography>
          </Typography>
        </Box>

        {Math.floor(kPoints / 100) <= totalPrice && (
          <>
            <Box my={2}>
              <Typography
                component="span"
                variant="h5"
                fontWeight={700}
                color="text.secondary"
                alignItems="center"
              >
                Price:{" "}
                <Typography
                  component="span"
                  variant="h5"
                  fontWeight={700}
                  color="success.main"
                >
                  {totalPrice}${" "}
                </Typography>
                <Typography
                  component="span"
                  variant="h5"
                  color="primary"
                  fontWeight={700}
                >
                  - {Math.floor(kPoints / 100)}
                </Typography>
              </Typography>
            </Box>
            <Grid container sx={{ alignItems: "center", marginBottom: 2 }}>
              <ArrowForwardIcon fontSize="large" color="primary" />
              <Typography
                component="span"
                variant="h4"
                fontWeight={700}
                color="success.main"
              >
                {Number(totalPrice) - Math.floor(kPoints / 100)}$
              </Typography>
            </Grid>
            <Typography
              component="span"
              variant="h5"
              fontWeight={700}
              color="text.secondary"
            >
              New K-Points Balance:{" "}
              <Typography
                component="span"
                variant="h5"
                color="primary"
                fontWeight={700}
              >
                {kPoints - Math.floor(kPoints / 100) * 100}
              </Typography>
            </Typography>
          </>
        )}

        {Math.floor(kPoints / 100) > totalPrice && (
          <>
            <Box my={2}>
              <Typography
                component="span"
                variant="h5"
                fontWeight={700}
                color="text.secondary"
                alignItems="center"
              >
                Price:{" "}
                <Typography
                  component="span"
                  variant="h5"
                  fontWeight={700}
                  color="success.main"
                >
                  {totalPrice}$
                </Typography>{" "}
                -{" "}
                <Typography
                  component="span"
                  variant="h5"
                  color="primary"
                  fontWeight={700}
                >
                  {Number(totalPrice)}
                </Typography>
              </Typography>
            </Box>
            <Grid container sx={{ alignItems: "center", marginBottom: 2 }}>
              <ArrowForwardIcon fontSize="large" color="forthColor" />
              <Typography
                component="span"
                variant="h4"
                fontWeight={700}
                color="success.main"
              >
                0$
              </Typography>
            </Grid>
            <Typography
              component="span"
              variant="h5"
              fontWeight={700}
              color="text.secondary"
            >
              New K-Points Balance:{" "}
              <Typography
                component="span"
                variant="h5"
                color="primary"
                fontWeight={700}
              >
                {" "}
                {kPoints - Number(totalPrice) * 100}
              </Typography>
            </Typography>
          </>
        )}
      </Box>
    );

  if (!useKP)
    return (
      <Grid container my={2} alignItems="center">
        <ArrowForwardIcon fontSize="large" color="success" />

        <Typography
          component="span"
          variant="h4"
          fontWeight={700}
          color="success.main"
        >
          {totalPrice}$
        </Typography>
      </Grid>
    );
  return null;
};

CartBill.propTypes = {
  totalPrice: number.isRequired,
  useKP: bool.isRequired,
};

export default CartBill;
