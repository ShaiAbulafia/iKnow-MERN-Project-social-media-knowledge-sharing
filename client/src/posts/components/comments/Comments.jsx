import React from "react";
import { arrayOf, func, string } from "prop-types";
import commentType from "../../models/types/commentType";
import { List, ListItem as MuiListItem } from "@mui/material";
import ListItem from "./List/ListItem";

const Comments = ({ comments, refComments, onDelete }) => {
  return (
    <>
      <List sx={{ p: 0, m: 0 }}>
        {comments.map((comment) => (
          <MuiListItem key={comment._id} sx={{ pr: 0, mr: 0 }}>
            <ListItem
              comment={comment}
              onDelete={onDelete}
              refComments={refComments}
            />
          </MuiListItem>
        ))}
      </List>
    </>
  );
};

Comments.propTypes = {
  comments: arrayOf(commentType),
  refComments: func.isRequired,
  onDelete: func.isRequired,
};

export default Comments;
