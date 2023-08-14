import React, { useState, useEffect } from "react";
import { func, string } from "prop-types";
import commentType from "../../../models/types/commentType";
import useUsers from "../../../../users/hooks/useUsers";
import {
  Avatar,
  Grid,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { makeFirstLetterCapital } from "../../../../utils/algoMethods";
import ItemMenu from "./ItemMenu";
import EditComment from "./EditComment";
import NewSubcomment from "./NewSubcomment";
import SubcommentsSection from "./SubcommentsSection";
import { Link } from "react-router-dom";
import ROUTES from "../../../../routes/routesModel";

const ListItem = ({ comment, refComments, onDelete }) => {
  const { handleGetUserDisplay } = useUsers();
  const [userDisplay, setUserDisplay] = useState();
  const date = new Date(comment.createdAt);
  const [isEdit, setEdit] = useState(false);
  const [isComment, setComment] = useState(false);
  const [isSubcomments, setSubcomments] = useState(false);

  useEffect(() => {
    handleGetUserDisplay(comment.userId).then((data) => {
      setUserDisplay(data);
    });
  }, []);

  const fullName = () => {
    if (userDisplay.name.middle === "")
      return `${makeFirstLetterCapital(
        userDisplay.name.first
      )} ${makeFirstLetterCapital(userDisplay.name.last)}`;
    return `${makeFirstLetterCapital(userDisplay.name.first)}
      ${makeFirstLetterCapital(userDisplay.name.middle)} 
      ${makeFirstLetterCapital(userDisplay.name.last)}`;
  };

  if (!userDisplay) return null;
  return (
    <>
      {!isEdit && (
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid item xs={3} sm={2} md={1}>
            <ListItemAvatar>
              <Avatar alt={userDisplay.image.alt} src={userDisplay.image.url} />
            </ListItemAvatar>
          </Grid>
          <Grid item xs={9} sm={8}>
            <ListItemText
              primary={
                userDisplay._id === "deleted" ? (
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color="text.secondary"
                    sx={{ marginBottom: 1 }}
                  >
                    {fullName()}
                  </Typography>
                ) : (
                  <Link
                    to={`${ROUTES.USER_PROFILE}/view/${userDisplay._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      color="primary"
                      sx={{ marginBottom: 1 }}
                    >
                      {fullName()}
                    </Typography>
                  </Link>
                )
              }
              secondary={
                <Typography variant="body1">{comment.text}</Typography>
              }
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={2}
            md={3}
            textAlign={{ xs: "left", md: "right" }}
          >
            <Typography variant="body2">{date.toLocaleString()}</Typography>
          </Grid>
          <ItemMenu
            comment={comment}
            onDelete={onDelete}
            refComments={refComments}
            setEdit={setEdit}
            setComment={setComment}
            setSubcomments={setSubcomments}
            isSubcomments={isSubcomments}
          />
          {isComment && (
            <NewSubcomment
              onPost={refComments}
              setSubcomments={setSubcomments}
              setComment={setComment}
              commentId={comment._id}
            />
          )}
          {isSubcomments && (
            <SubcommentsSection
              commentId={comment._id}
              isSubcomments={isSubcomments}
            />
          )}
        </Grid>
      )}

      {isEdit && (
        <EditComment
          comment={comment}
          refComments={refComments}
          setEdit={setEdit}
        />
      )}
    </>
  );
};

ListItem.propTypes = {
  comment: commentType.isRequired,
  refComments: func.isRequired,
  onDelete: func.isRequired,
};

export default ListItem;
