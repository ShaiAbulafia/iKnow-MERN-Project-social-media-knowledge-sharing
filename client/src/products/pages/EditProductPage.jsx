import { useEffect } from "react";
import useForm from "../../forms/hooks/useForm";
import initialProductForm from "../helpers/initialForms/initialProductForm";
import productSchema from "../models/joi-schemas/productSchema";
import useProducts from "../hooks/useProducts";
import { useUser } from "../../users/providers/UserProvider";
import { useNavigate, Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Container, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import mapProductToModel from "../helpers/normalization/mapProductToModel";
import normalizeProduct from "../helpers/normalization/normalizeProduct";
import ProductForm from "../components/ProductForm";
import { useTheme } from "../../providers/ThemeProvider";
import PageHeader from "../../components/PageHeader";

const EditProductPage = () => {
  const { isDark } = useTheme();
  const { valueProduct, handleUpdateProduct, handleGetProduct } = useProducts();
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const { value, ...rest } = useForm(initialProductForm, productSchema, () =>
    handleUpdateProduct(valueProduct.product._id, {
      ...normalizeProduct({ ...value.data }),
      productNumber: valueProduct.product.productNumber,
    })
  );

  useEffect(() => {
    handleGetProduct(id).then((data) => {
      if (!data) navigate(ROUTES.PRODUCTS);
      const modeledProduct = mapProductToModel(data);
      rest.setData(modeledProduct);
    });
  }, []);

  if (!user.isAdmin) return <Navigate replace to={ROUTES.PRODUCTS} />;

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
          title={"Edit Product Form"}
        />
      </Paper>
    </Container>
  );
};

export default EditProductPage;
