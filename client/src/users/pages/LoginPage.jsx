import React from "react";
import { Link, Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../providers/UserProvider";
import useUsers from "../hooks/useUsers";
import useForm from "../../forms/hooks/useForm";
import initialLoginFrom from "../helpers/initialForms/initialLoginForm";
import loginSchema from "../models/joi-schema/loginSchema";
import { Container, Divider, Paper, Typography } from "@mui/material";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import { useTheme } from "../../providers/ThemeProvider";
import PageHeader from "../../components/PageHeader";

const LoginPage = () => {
  const { isDark } = useTheme();
  const { user } = useUser();
  const { handleLogin } = useUsers();
  const { value, ...rest } = useForm(
    initialLoginFrom,
    loginSchema,
    handleLogin
  );

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
        <Form
          onSubmit={rest.onSubmit}
          onReset={rest.handleReset}
          onChange={rest.validateForm}
          styles={{ maxWidth: "400px" }}
          to={ROUTES.ABOUT}
          title={"Welcome back!"}
        >
          <Input
            label="Email"
            name="email"
            type="email"
            data={value.data}
            error={value.errors.email}
            onChange={rest.handleChange}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            data={value.data}
            error={value.errors.password}
            onChange={rest.handleChange}
          />
        </Form>
        <Divider sx={{ my: 1 }} />
        <Link to={ROUTES.RESET_PASS} style={{ textDecoration: "none" }}>
          <Typography variant="body1" fontWeight={700} color="primary">
            Forgot password
          </Typography>
        </Link>
      </Paper>
    </Container>
  );
};

export default LoginPage;
