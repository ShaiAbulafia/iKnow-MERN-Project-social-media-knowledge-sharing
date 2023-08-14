import { useEffect } from "react";
import useForm from "../../forms/hooks/useForm";
import initialPostForm from "../helpers/initialForms/initialPostForm";
import postSchema from "../models/joi-schemas/postSchema";
import usePosts from "../hooks/usePosts";
import { useUser } from "../../users/providers/UserProvider";
import { useNavigate, Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Container, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import mapPostToModel from "../helpers/normalization/mapPostToModel";
import normalizePost from "../helpers/normalization/normalizePost";
import PostForm from "../components/PostForm";
import { useTheme } from "../../providers/ThemeProvider";

const EditProductPage = () => {
  const { isDark } = useTheme();
  const { handleUpdatePost, handleGetPost, valuePost } = usePosts();
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const { value, ...rest } = useForm(initialPostForm, postSchema, () =>
    handleUpdatePost(valuePost.post._id, normalizePost({ ...value.data }))
  );

  useEffect(() => {
    handleGetPost(id).then((data) => {
      if (!data) navigate(ROUTES.POSTS);
      const modeledPost = mapPostToModel(data);
      rest.setData(modeledPost);
    });
  }, []);

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
        {!!valuePost.post && (
          <PostForm
            onSubmit={rest.onSubmit}
            onReset={rest.handleReset}
            errors={value.errors}
            onFormChange={rest.validateForm}
            onInputChange={rest.handleChange}
            data={value.data}
            title={"Edit Post Form"}
            sectionC={valuePost.post.sections.length}
            tagC={valuePost.post.tags.length}
          />
        )}

        {!valuePost.post && (
          <Typography variant="h5" textAlign="center">
            Oops.. could not load the post you were looking for!
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default EditProductPage;
