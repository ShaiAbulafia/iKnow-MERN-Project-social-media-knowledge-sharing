import { Grid } from "@mui/material";
import { arrayOf } from "prop-types";
import React from "react";
import viewUserType from "../models/types/viewUserType";
import Card from "./card/Card";
import { animated, useTransition } from "react-spring";

const UsersTop = ({ users }) => {
  const transition = useTransition(users, {
    from: {
      opacity: 0,
      y: "-15%",
    },
    enter: {
      opacity: 1,
      y: "0%",
    },
    trail: 200,
  });
  return (
    <>
      <Grid container spacing={5}>
        {transition((style, user) => (
          <Grid item key={user._id} pb={2} xs={12} sm={6} md={4}>
            <animated.div style={style}>
              <Card user={user} place={users.indexOf(user) + 1} />
            </animated.div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

UsersTop.propTypes = {
  users: arrayOf(viewUserType).isRequired,
};
export default UsersTop;
