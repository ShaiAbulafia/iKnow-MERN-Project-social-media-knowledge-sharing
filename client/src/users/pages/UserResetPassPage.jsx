import React from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../providers/UserProvider";
import { Container, Paper, Typography } from "@mui/material";
import useForm from "../../forms/hooks/useForm";
import useUsers from "../hooks/useUsers";
import initialResetPassForm from "../helpers/initialForms/initialResetPassForm";
import resetPassSchema from "../models/joi-schema/resetPassSchema";
import UserResetPassForm from "../components/UserResetPassForm";
import { useTheme } from "../../providers/ThemeProvider";
import PageHeader from "../../components/PageHeader";

const UserResetPassPage = () => {
  const { isDark } = useTheme();
  const { handleChangePass } = useUsers();

  const { value, ...rest } = useForm(
    initialResetPassForm,
    resetPassSchema,
    handleChangePass
  );

  const { user } = useUser();

  if (user) return <Navigate replace to={ROUTES.POSTS} />;

  return (
    <Container
      sx={{
        pt: 6,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          border: 2,
          borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
          backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
        }}
        style={{
          paddingLeft: 50,
          paddingRight: 50,
          paddingBottom: 20,
        }}
      >
        <UserResetPassForm
          data={value.data}
          errors={value.errors}
          onFormChange={rest.validateForm}
          onInputChange={rest.handleChange}
          onReset={rest.handleReset}
          onSubmit={rest.onSubmit}
          setData={rest.setData}
          title={"Reset password form"}
        />
      </Paper>
    </Container>
  );
};
export default UserResetPassPage;
