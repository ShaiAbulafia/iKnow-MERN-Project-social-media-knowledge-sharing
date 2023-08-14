import React, { useState, useEffect } from "react";
import MuiCard from "@mui/material/Card";
import { func } from "prop-types";
import { useTheme } from "../../../providers/ThemeProvider";
import postType from "../../models/types/postType";
import CardBody from "./CardBody";
import CardActionsBar from "./CardActionsBar";
import CardHeader from "./CardHeader";
import { Box } from "@mui/material";
import { useUser } from "../../../users/providers/UserProvider";
import useUsers from "../../../users/hooks/useUsers";

const Card = ({ post, onDelete, onFav }) => {
  const { isDark } = useTheme();
  const { user } = useUser();
  const { handleGetUserDisplay } = useUsers();
  const [userDisplay, setUserDisplay] = useState();

  useEffect(() => {
    handleGetUserDisplay(post.userId).then((data) => {
      setUserDisplay(data);
    });
  }, []);

  const [isFav, setFav] = useState(() => {
    if (!user) return false;
    return !!post.favorites.find((id) => id === user._id);
  });

  if (!userDisplay) return null;
  return (
    <>
      <MuiCard
        elevation={3}
        sx={{
          borderRadius: 5,
          minWidth: 280,
          border: 2,
          borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
        }}
      >
        <Box display={{ md: "none" }}>
          <CardHeader
            post={post}
            onDelete={onDelete}
            onFav={onFav}
            userDisplay={userDisplay}
            isFav={isFav}
            setFav={setFav}
          />
        </Box>
        <CardBody post={post} userDisplay={userDisplay} />

        <CardActionsBar
          post={post}
          onDelete={onDelete}
          onFav={onFav}
          isFav={isFav}
          setFav={setFav}
        />
      </MuiCard>
    </>
  );
};

Card.propTypes = {
  post: postType.isRequired,
  onDelete: func.isRequired,
  onFav: func.isRequired,
};

export default Card;
