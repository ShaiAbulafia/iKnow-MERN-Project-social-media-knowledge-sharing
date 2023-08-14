import React from "react";
import useForm from "../../forms/hooks/useForm";
import initialPostForm from "./../helpers/initialForms/initialPostForm";
import postSchema from "../models/joi-schemas/postSchema";
import usePosts from "./../hooks/usePosts";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Container, Paper } from "@mui/material";
import PostForm from "../components/PostForm";
import { useTheme } from "../../providers/ThemeProvider";

const CreatePostPage = () => {
  const { isDark } = useTheme();
  const { handleCreatePost } = usePosts();
  const { user } = useUser();
  const { value, ...rest } = useForm(
    initialPostForm,
    postSchema,
    handleCreatePost
  );

  if (!user) return <Navigate replace to={ROUTES.POSTS} />;

  return (
    <Container
      sx={{
        pt: 10,
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
        <PostForm
          onSubmit={rest.onSubmit}
          onReset={rest.handleReset}
          errors={value.errors}
          onFormChange={rest.validateForm}
          onInputChange={rest.handleChange}
          data={value.data}
          title={"New Post"}
        />
      </Paper>
    </Container>
  );
};

export default CreatePostPage;
