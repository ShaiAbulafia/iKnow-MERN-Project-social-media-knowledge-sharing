import React from "react";
import useForm from "../../forms/hooks/useForm";
import initialProductForm from "./../helpers/initialForms/initialProductForm";
import productSchema from "../models/joi-schemas/productSchema";
import useProducts from "./../hooks/useProducts";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Container, Paper } from "@mui/material";
import ProductForm from "../components/ProductForm";
import { useTheme } from "../../providers/ThemeProvider";
import PageHeader from "../../components/PageHeader";

const CreateProductPage = () => {
  const { isDark } = useTheme();
  const { handleCreateProduct } = useProducts();
  const { user } = useUser();
  const { value, ...rest } = useForm(
    initialProductForm,
    productSchema,
    handleCreateProduct
  );

  if (!user || !user.isAdmin) return <Navigate replace to={ROUTES.PRODUCTS} />;

  return (
    <Container
      sx={{
        pt: 6,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
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
        <ProductForm
          onSubmit={rest.onSubmit}
          onReset={rest.handleReset}
          errors={value.errors}
          onFormChange={rest.validateForm}
          onInputChange={rest.handleChange}
          data={value.data}
          title={"Product Form"}
        />
      </Paper>
    </Container>
  );
};

export default CreateProductPage;
