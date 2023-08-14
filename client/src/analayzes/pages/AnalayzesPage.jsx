import React, { useEffect } from "react";
import usePosts from "../../posts/hooks/usePosts";
import useProducts from "../../products/hooks/useProducts";
import ProductAnalayze from "../components/products/ProductAnalayze";
import { Box, Typography } from "@mui/material";
import PostAnalayze from "../components/posts/PostAnalayze";
import { useUser } from "../../users/providers/UserProvider";
import useUsers from "../../users/hooks/useUsers";
import ROUTES from "../../routes/routesModel";
import { useNavigate, Navigate } from "react-router-dom";

const AnalayzesPage = () => {
  const { valuePost, handleGetPosts } = usePosts();
  const { valueProduct, handleGetProducts } = useProducts();
  const { user } = useUser();
  const { value, handleGetUser } = useUsers();
  const navigate = useNavigate();
  useEffect(() => {
    if (user)
      handleGetUser(user._id).then((data) => {
        if (!data) navigate(ROUTES.ROOT);
      });
    handleGetPosts();
    handleGetProducts();
  }, []);

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;
  return (
    <Box pt={8}>
      <Typography
        variant="h4"
        color="text.secondary"
        marginBottom={3}
        align="center"
      >
        Top wished products
      </Typography>

      <ProductAnalayze
        isLoading={valueProduct.isLoading}
        error={valueProduct.error}
        products={valueProduct.filteredProducts}
      />
      <Typography
        variant="h4"
        color="text.secondary"
        marginTop={10}
        marginBottom={3}
        align="center"
      >
        Top posts
      </Typography>
      <PostAnalayze
        isLoading={valuePost.isLoading}
        error={valuePost.error}
        posts={valuePost.filteredPosts}
      />
    </Box>
  );
};

export default AnalayzesPage;
