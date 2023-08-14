import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "../../../providers/ThemeProvider";
import postType from "../../models/types/postType";

import { useUser } from "../../../users/providers/UserProvider";
import { bool, func } from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import usePosts from "../../hooks/usePosts";
import PostDialogDelete from "./PostDialogDelete";
import MuiCardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import userDisplayType from "../../models/types/userDisplayType";

const CardHeader = ({ post, onDelete, onFav, userDisplay, isFav, setFav }) => {
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
      <MuiCardHeader
        avatar={
          <Avatar
            alt={userDisplay.image.alt}
            src={userDisplay.image.url}
          ></Avatar>
        }
        action={
          <>
            {user && (user._id === post.userId || user.isAdmin) && (
              <IconButton
                aria-label="delete card"
                onClick={() => handleDialog("open")}
              >
                <DeleteIcon />
              </IconButton>
            )}
            {user && user._id === post.userId && (
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
          </>
        }
        sx={{
          backgroundColor: isDark ? "darkModeColor.main" : "forthColor.main",
        }}
      />
      <PostDialogDelete
        isDialogOpen={isDialogOpen}
        onChangeDialog={handleDialog}
        onDelete={handleDeletePost}
      />
    </>
  );
};

CardHeader.propTypes = {
  post: postType.isRequired,
  onDelete: func.isRequired,
  onFav: func.isRequired,
  userDisplay: userDisplayType.isRequired,
  isFav: bool.isRequired,
  setFav: func.isRequired,
};

export default CardHeader;
