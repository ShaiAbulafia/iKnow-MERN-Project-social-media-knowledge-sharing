import React from "react";
import { string, bool } from "prop-types";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import { Typography, Paper as MuiPaper } from "@mui/material";
import Paper from "./infoPaper/Paper";
import viewUserType from "../models/types/viewUserType";
import { useTheme } from "../../providers/ThemeProvider";

const UserInfoFeedback = ({ isLoading, error, user }) => {
  const { isDark } = useTheme();
  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (!user)
    return (
      <MuiPaper
        elevation={3}
        sx={{
          border: 2,
          borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
          backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
        }}
        style={{
          padding: 50,
        }}
      >
        <Typography variant="body1">
          Oops.. cant find the user in database that you were looking for!
        </Typography>
      </MuiPaper>
    );
  if (user) return <Paper user={user} />;
  return null;
};

UserInfoFeedback.propTypes = {
  user: viewUserType,
  isLoading: bool.isRequired,
  error: string,
};

export default UserInfoFeedback;
