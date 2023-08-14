import React from "react";
import { arrayOf, string, bool, func } from "prop-types";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import viewUserType from "../models/types/viewUserType";
import { Paper, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import UsersTop from "./UsersTop";

const UsersFeedbackTop = ({ isLoading, error, users }) => {
  const { isDark } = useTheme();
  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (users && !users.length)
    return (
      <>
        <Paper
          sx={{
            border: 2,
            borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
            backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
          }}
          style={{
            padding: 50,
          }}
        >
          <Typography variant="h5" textAlign="center">
            Oops.. there are no users in database to display!
          </Typography>
        </Paper>
      </>
    );
  if (users)
    return (
      <>
        <UsersTop
          users={users
            .sort((a, b) => {
              return b.follows.length - a.follows.length;
            })
            .slice(0, 10)}
        />
      </>
    );
  return null;
};

UsersFeedbackTop.propTypes = {
  users: arrayOf(viewUserType),
  isLoading: bool.isRequired,
  error: string,
};

export default UsersFeedbackTop;
