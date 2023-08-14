import React, { useState } from "react";
import { bool, func } from "prop-types";
import commentType from "../../../models/types/commentType";
import { useUser } from "../../../../users/providers/UserProvider";
import { Grid, IconButton, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import useComments from "../../../hooks/useComments";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DialogRemove from "./DialogRemove";

const ItemMenu = ({
  comment,
  onDelete,
  refComments,
  setEdit,
  setComment,
  setSubcomments,
  isSubcomments,
}) => {
  const { user } = useUser();
  const { handleLikeComment, handleDislikeComment } = useComments();
  const [isDialogOpen, setDialog] = useState(false);

  const isLike = () => {
    if (!user) return false;
    return !!comment.like.find((id) => id === user._id);
  };
  const isDislike = () => {
    if (!user) return false;
    return !!comment.dislike.find((id) => id === user._id);
  };

  const handleLike = async () => {
    await handleLikeComment(comment._id);
    refComments();
  };

  const handleDislike = async () => {
    await handleDislikeComment(comment._id);
    refComments();
  };

  const handleDialog = (term) => {
    if (term === "open") return setDialog(true);
    setDialog(false);
  };

  const handleDelete = async () => {
    handleDialog();
    await onDelete(comment._id);
    refComments();
  };

  return (
    <>
      <Grid item xs={12} md={6}>
        <IconButton
          edge="end"
          aria-label="Like"
          onClick={() => {
            setSubcomments((prev) => !prev);
          }}
          sx={{ marginLeft: 1 }}
        >
          {!isSubcomments && <ExpandMoreIcon />}
          {isSubcomments && <ExpandLessIcon color="primary" />}
        </IconButton>
        {user && (
          <>
            <IconButton
              edge="end"
              aria-label="Like"
              onClick={handleLike}
              sx={{ marginLeft: 1 }}
            >
              <ThumbUpIcon color={isLike() ? "primary" : "inherit"} />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="Dislike"
              onClick={handleDislike}
              sx={{ marginLeft: 1 }}
            >
              <ThumbDownIcon color={isDislike() ? "error" : "inherit"} />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="Like"
              onClick={() => {
                setComment(true);
              }}
              sx={{ marginLeft: 1 }}
            >
              <AddCommentIcon />
            </IconButton>
          </>
        )}
        {user && (user._id === comment.userId || user.isAdmin) && (
          <>
            <IconButton
              edge="end"
              aria-label="Edit"
              onClick={() => {
                setEdit(true);
              }}
              sx={{ marginLeft: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="Delete"
              onClick={() => handleDialog("open")}
              sx={{ marginLeft: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Grid>
      <Grid item xs={12} md={6} textAlign={{ xs: "left", md: "right" }}>
        <Typography variant="body2" component="span">
          {comment.like.length} Likes -{" "}
        </Typography>
        <Typography variant="body2" component="span">
          {comment.dislike.length} Dislikes -{" "}
        </Typography>
        <Typography variant="body2" component="span">
          {comment.subcomments.length} comments
        </Typography>
      </Grid>
      <DialogRemove
        isDialogOpen={isDialogOpen}
        onChangeDialog={handleDialog}
        onDelete={handleDelete}
      />
    </>
  );
};

ItemMenu.propTypes = {
  comment: commentType.isRequired,
  onDelete: func.isRequired,
  refComments: func.isRequired,
  setEdit: func.isRequired,
  setComment: func.isRequired,
  setSubcomments: func.isRequired,
  isSubcomments: bool.isRequired,
};

export default ItemMenu;
