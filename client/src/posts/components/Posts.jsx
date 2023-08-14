import React from "react";
import { Grid } from "@mui/material";
import { arrayOf, func } from "prop-types";
import postType from "../models/types/postType";
import Card from "./card/Card";
import { animated, useTransition } from "react-spring";

const Posts = ({ posts, onDelete, onFav }) => {
  const transition = useTransition(posts, {
    from: {
      opacity: 0,
      x: "-10%",
    },
    enter: {
      opacity: 1,
      x: "0%",
    },
    trail: 200,
  });
  return (
    <>
      <Grid container spacing={5}>
        {transition((style, post) => (
          <Grid item key={post._id} xs={12}>
            <animated.div style={style}>
              <Card post={post} onDelete={onDelete} onFav={onFav} />
            </animated.div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

Posts.propTypes = {
  posts: arrayOf(postType).isRequired,
  onDelete: func.isRequired,
  onFav: func.isRequired,
};
export default Posts;
