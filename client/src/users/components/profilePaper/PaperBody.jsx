import React, { useState } from "react";
import viewUserType from "../../models/types/viewUserType";
import {
  Grid,
  Divider,
  Typography,
  Paper,
  Tooltip,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { makeEveryFirstLetterCapital } from "../../../utils/algoMethods";
import { useTheme } from "../../../providers/ThemeProvider";
import { useUser } from "../../providers/UserProvider";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import useUsers from "../../hooks/useUsers";
import BackspaceIcon from "@mui/icons-material/Backspace";

const PaperBody = ({ userObj }) => {
  const { user } = useUser();
  const [isFollowed, setFollow] = useState(() => {
    if (!user) return false;
    return !!userObj.follows.find((id) => id === user._id);
  });
  const { handleFollowUser } = useUsers();
  const date = new Date(userObj.createdAt);
  const { isDark } = useTheme();
  let fullName = `${userObj.name.first} ${userObj.name.middle} ${userObj.name.last}`;
  if (!userObj.name.middle) {
    fullName = `${userObj.name.first} ${userObj.name.last}`;
  }
  fullName = makeEveryFirstLetterCapital(fullName);

  const handleFollow = async () => {
    await handleFollowUser(userObj._id, isFollowed);
    setFollow((prev) => !prev);
  };
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          border: 2,
          borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
          backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
        }}
      >
        <Typography
          fontWeight={700}
          variant="h5"
          component="span"
          color="text.secondary"
        >
          {fullName}
        </Typography>
        <Divider sx={{ marginY: 2 }} />

        <Typography fontWeight={700} variant="body1" color="text.secondary">
          Member since: {date.toLocaleDateString()}
        </Typography>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mt: 3,
          border: 2,
          borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
          backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
        }}
      >
        <Typography variant="h5" color="text.secondary" fontWeight={700}>
          About me
        </Typography>
        <Divider sx={{ marginY: 1 }} />
        <Typography variant="body1" color="text.secondary" fontWeight={700}>
          {userObj.aboutMe}
        </Typography>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mt: 3,
          border: 2,
          borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
          backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          component="span"
          color="text.secondary"
          fontWeight={700}
        >
          {userObj.follows.length} followers
        </Typography>
        {user && user._id !== userObj._id && (
          <Button
            variant="contained"
            color={isFollowed ? "error" : "primary"}
            aria-label="follow"
            onClick={handleFollow}
          >
            <Box display="flex">
              {isFollowed ? (
                <>
                  <Typography
                    fontWeight={700}
                    variant="body1"
                    color="white"
                    marginRight={2}
                  >
                    Unfollow
                  </Typography>
                  <BackspaceIcon />
                </>
              ) : (
                <>
                  <Typography
                    fontWeight={700}
                    variant="body1"
                    color="white"
                    marginRight={2}
                  >
                    Follow
                  </Typography>
                  <BookmarkIcon />
                </>
              )}
            </Box>
          </Button>
        )}
      </Paper>
    </>
  );
};

PaperBody.propTypes = {
  userObj: viewUserType.isRequired,
};

export default PaperBody;
