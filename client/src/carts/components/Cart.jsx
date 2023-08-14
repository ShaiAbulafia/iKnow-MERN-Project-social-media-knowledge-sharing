import React, { useState, useEffect, useCallback } from "react";
import { func, arrayOf } from "prop-types";
import fullProductsList from "../models/types/fullProductsList";
import Table from "./table/Table";
import CartMenu from "./CartMenu";
import CartBill from "./CartBill";
import useCarts from "../hooks/useCarts";
import { Typography, Switch, Grid, Paper } from "@mui/material";
import { useUser } from "../../users/providers/UserProvider";
import { getUserAddress } from "../../users/services/userApiService";
import CartAddress from "./CartAddress";
import { useTheme } from "../../providers/ThemeProvider";
import ROUTES from "../../routes/routesModel";
import { useNavigate, Navigate } from "react-router-dom";
import { animated, useSpring } from "react-spring";

const Cart = ({ products, onUpdate, onRemove, onEmpty }) => {
  const [useKP, setUseKP] = useState(true);
  const { handleGetTotalPrice } = useCarts();
  const { isDark } = useTheme();
  const { user } = useUser();
  const [orderReady, setOrderReady] = useState(true);
  const [userContantInfo, setUserContantInfo] = useState({
    phone: "",
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: 0,
      zip: 0,
    },
  });
  const navigate = useNavigate();
  const entrance = useSpring({
    from: { opacity: 0, x: "-10%" },
    to: { opacity: 1, x: "0" },
  });
  useEffect(() => {
    getUserAddress(user._id).then((data) => {
      if (Object.keys(data).length === 0) return setOrderReady(false);
      for (let key in data) {
        if (data[key] === "" || data[key] === 0) setOrderReady(false);
        setUserContantInfo(data);
      }
    });
  }, []);

  const onSubContact = useCallback(() => {
    getUserAddress(user._id).then((data) => {
      if (!data) navigate(ROUTES.PRODUCTS);
      setUserContantInfo(data);
    });
  }, [navigate, user._id]);

  if (!user) return <Navigate replace to={ROUTES.LOGIN} />;
  return (
    <>
      <animated.div style={entrance}>
        <Table products={products} onUpdate={onUpdate} onRemove={onRemove} />
      </animated.div>
      <animated.div style={entrance}>
        <Paper
          elevation={3}
          sx={{
            my: 3,
            p: 3,
            border: 3,
            borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
            backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
          }}
        >
          <Grid container alignItems="center">
            <Switch
              defaultChecked
              onChange={() => {
                setUseKP((prev) => !prev);
              }}
            />
            <Typography
              component="span"
              variant="body1"
              color="primary"
              fontWeight={700}
            >
              Use K-Points
            </Typography>
          </Grid>

          <CartBill totalPrice={handleGetTotalPrice(products)} useKP={useKP} />
        </Paper>
      </animated.div>
      <animated.div style={entrance}>
        <Paper
          elevation={3}
          sx={{
            my: 3,
            p: 3,
            border: 3,
            borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
            backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
          }}
        >
          <CartAddress
            orderReady={orderReady}
            setOrderReady={setOrderReady}
            userInfo={userContantInfo}
            onSub={onSubContact}
          />
        </Paper>
      </animated.div>
      <animated.div style={entrance}>
        <CartMenu
          onEmpty={onEmpty}
          totalPrice={handleGetTotalPrice(products)}
          products={products}
          orderReady={orderReady}
          useKP={useKP}
        />
      </animated.div>
    </>
  );
};

Cart.propTypes = {
  products: arrayOf(fullProductsList).isRequired,
  onUpdate: func.isRequired,
  onRemove: func.isRequired,
  onEmpty: func.isRequired,
};

export default Cart;
