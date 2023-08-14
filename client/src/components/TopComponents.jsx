import React, { useCallback, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Divider, IconButton, Typography } from "@mui/material";
import usePosts from "../posts/hooks/usePosts";
import PostsFeedbackTop from "../posts/components/PostsFeedbackTop";
import { Link } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import useProducts from "../products/hooks/useProducts";
import ProductsFeedbackTop from "../products/components/ProductsFeedbackTop";
import useUsers from "../users/hooks/useUsers";
import UsersFeedbackTop from "../users/components/UsersFeedbackTop";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { func, number } from "prop-types";

const TopComponents = () => {
  const { valuePost, handleGetPosts, handleDeletePost } = usePosts();
  const { valueProduct, handleGetProducts, handleDeleteProduct } =
    useProducts();
  const { value, handleGetUsersDisplay } = useUsers();
  const displayComp = ["users", "products", "posts"];
  const [displayIndex, setDisplayIndex] = useState(0);

  useEffect(() => {
    onEnter();
  }, []);

  const onEnter = useCallback(async () => {
    await handleGetPosts();
    await handleGetProducts();
    await handleGetUsersDisplay();
  }, [handleGetPosts, handleGetProducts, handleGetUsersDisplay]);

  const onDeletePost = useCallback(
    async (postId) => {
      await handleDeletePost(postId);
      await handleGetPosts();
    },
    [handleDeletePost, handleGetPosts]
  );

  const onDeleteProduct = useCallback(
    async (productId) => {
      await handleDeleteProduct(productId);
      await handleGetProducts();
    },
    [handleDeleteProduct, handleGetProducts]
  );

  const handleNextDisplay = useCallback(async () => {
    setDisplayIndex((prev) => {
      if (prev === 2) return 0;
      return prev + 1;
    });
  }, []);

  const handlePrevDisplay = useCallback(async () => {
    setDisplayIndex((prev) => {
      if (prev === 0) return 2;
      return prev - 1;
    });
  }, []);

  return (
    <>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handlePrevDisplay}>
          <ArrowBackIcon fontSize="large" color="primary" />
        </IconButton>
        {displayComp[displayIndex] === "posts" && (
          <Typography variant="h5" component="span" fontWeight={700} mx={3}>
            Top 5 rated posts this month
          </Typography>
        )}
        {displayComp[displayIndex] === "products" && (
          <Typography variant="h5" component="span" fontWeight={700} mx={3}>
            Top 4 wished products
          </Typography>
        )}
        {displayComp[displayIndex] === "users" && (
          <Typography variant="h5" component="span" fontWeight={700} mx={3}>
            Top 10 followed users
          </Typography>
        )}
        <IconButton onClick={handleNextDisplay}>
          <ArrowForwardIcon fontSize="large" color="primary" />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      {displayComp[displayIndex] === "posts" && (
        <Grid item xs={12}>
          <PostsFeedbackTop
            isLoading={valuePost.isLoading}
            posts={valuePost.filteredPosts}
            error={valuePost.error}
            onDelete={onDeletePost}
          />
          <Link
            to={`${ROUTES.POSTS}/all_posts`}
            style={{ textDecoration: "none", display: "inline-block" }}
          >
            <Typography
              variant="body1"
              color="primary"
              fontWeight={700}
              mt={3}
              mb={1}
            >
              View more posts
            </Typography>
          </Link>
        </Grid>
      )}

      {displayComp[displayIndex] === "products" && (
        <Grid item xs={12}>
          <ProductsFeedbackTop
            isLoading={valueProduct.isLoading}
            products={valueProduct.filteredProducts}
            error={valueProduct.error}
            onDelete={onDeleteProduct}
          />
          <Link
            to={ROUTES.PRODUCTS}
            style={{ textDecoration: "none", display: "inline-block" }}
          >
            <Typography
              variant="body1"
              color="primary"
              fontWeight={700}
              mt={3}
              mb={1}
            >
              View more products
            </Typography>
          </Link>
        </Grid>
      )}

      {displayComp[displayIndex] === "users" && (
        <Grid item xs={12}>
          <UsersFeedbackTop
            isLoading={value.isLoading}
            users={value.usersDisplay}
            error={value.error}
          />
        </Grid>
      )}
    </>
  );
};

export default TopComponents;
