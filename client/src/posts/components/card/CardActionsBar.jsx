import React, { useState } from "react";
import { bool, func } from "prop-types";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import { useTheme } from "../../../providers/ThemeProvider";
import postType from "../../models/types/postType";
import { useUser } from "../../../users/providers/UserProvider";
import { Box, CardActions, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import usePosts from "../../hooks/usePosts";
import PostDialogDelete from "./PostDialogDelete";

const CardActionsBar = ({ post, onDelete, onFav, isFav, setFav }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [isDialogOpen, setDialog] = useState(false);

  const { handleFavPost } = usePosts();

  const handleDialog = (term) => {
    if (term === "open") return setDialog(true);
    setDialog(false);
  };

  const handleFav = async () => {
    setFav((prev) => !prev);
    await handleFavPost(post._id);
    onFav();
  };

  const handleDeletePost = () => {
    handleDialog();
    onDelete(post._id);
  };

  return (
    <>
      <CardActions
        sx={{
          backgroundColor: isDark ? "darkModeColor.main" : "forthColor.main",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="body1"
            color="secondColor.main"
            fontWeight={700}
            component="span"
            marginLeft={1}
          >
            Tags
          </Typography>
          {(() => {
            let tags = [];
            for (let i = 0; i < post.tags.length; i++) {
              tags.push(
                <Typography
                  variant="body1"
                  color="secondColor.main"
                  key={`${post._id}-tag${i}`}
                  marginLeft={1}
                  component="span"
                >
                  - {post.tags[i]}
                </Typography>
              );
            }
            return tags;
          })()}
        </Box>
        <Box display={{ xs: "none", md: "flex" }}>
          {user && (user._id === post.userId || user.isAdmin) && (
            <IconButton
              aria-label="delete card"
              onClick={() => handleDialog("open")}
            >
              <DeleteIcon />
            </IconButton>
          )}
          {user && (user._id === post.userId || user.isAdmin) && (
            <IconButton
              aria-label="edit card"
              onClick={() => navigate(`${ROUTES.EDIT_POST}/${post._id}`)}
            >
              <EditIcon />
            </IconButton>
          )}
          {user && (
            <IconButton aria-label="add to fav" onClick={handleFav}>
              <FavoriteIcon color={isFav ? "error" : "inherit"} />
            </IconButton>
          )}
        </Box>
      </CardActions>

      <PostDialogDelete
        isDialogOpen={isDialogOpen}
        onChangeDialog={handleDialog}
        onDelete={handleDeletePost}
      />
    </>
  );
};

CardActionsBar.propTypes = {
  post: postType.isRequired,
  onDelete: func.isRequired,
  onFav: func.isRequired,
  isFav: bool.isRequired,
  setFav: func.isRequired,
};

export default CardActionsBar;
