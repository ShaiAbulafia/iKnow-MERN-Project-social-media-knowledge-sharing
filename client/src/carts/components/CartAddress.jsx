import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { makeFirstLetterCapital } from "../../utils/algoMethods";
import { bool, func } from "prop-types";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";
import AddressForm from "./AddressForm";
import useUsers from "../../users/hooks/useUsers";
import initialAddressForm from "../helpers/initialForms/initialAddressForm";
import addressSchema from "../models/joi-schema/addressSchema";
import { useNavigate } from "react-router-dom";
import normalizeUser from "../helpers/normalization/normalizeUser";
import useForm from "../../forms/hooks/useForm";
import mapUserToModel from "../helpers/normalization/mapUserToModel";
import EditIcon from "@mui/icons-material/Edit";
import userInfoType from "../models/types/userInfoType";

const CartAddress = ({ orderReady, setOrderReady, userInfo, onSub }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { handleUpdateUserContact, handleGetUser } = useUsers();

  const { value, ...rest } = useForm(
    initialAddressForm,
    addressSchema,
    async () => {
      const normalizedUser = normalizeUser({ ...value.data });
      await handleUpdateUserContact(user._id, normalizedUser);
      setOrderReady(true);
      onSub();
    }
  );

  useEffect(() => {
    handleGetUser(user._id).then((data) => {
      if (!data) return;
      if (user._id !== data._id) navigate(ROUTES.PRODUCTS);
      const modeledUser = mapUserToModel(data);
      rest.setData(modeledUser);
    });
  }, []);

  if (user && orderReady)
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            component="span"
            variant="h5"
            fontWeight={700}
            color="text.secondary"
          >
            Phone:{" "}
            <Typography variant="h5" component="span" color="text.secondary">
              {userInfo.phone}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            component="span"
            variant="h5"
            fontWeight={700}
            color="text.secondary"
          >
            Delivery to:{" "}
            <Typography component="span" variant="h5" color="text.secondary">
              {makeFirstLetterCapital(userInfo.address.state)},{" "}
              {makeFirstLetterCapital(userInfo.address.country)},{" "}
              {makeFirstLetterCapital(userInfo.address.city)},{" "}
              {makeFirstLetterCapital(userInfo.address.street)}, house no.
              {userInfo.address.houseNumber} | Zip: {userInfo.address.zip}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Button
            aria-label="Empty cart"
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setOrderReady(false)}
          >
            <EditIcon />
          </Button>
        </Grid>
      </Grid>
    );
  if (user && !orderReady)
    return (
      <AddressForm
        data={value.data}
        errors={value.errors}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleChange}
        onReset={rest.handleReset}
        onSubmit={rest.onSubmit}
        setData={rest.setData}
      />
    );
  return null;
};

CartAddress.propTypes = {
  orderReady: bool.isRequired,
  setOrderReady: func.isRequired,
  userInfo: userInfoType.isRequired,
  onSub: func.isRequired,
};

export default CartAddress;
