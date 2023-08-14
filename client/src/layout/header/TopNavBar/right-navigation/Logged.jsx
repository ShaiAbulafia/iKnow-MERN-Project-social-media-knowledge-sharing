import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useMenu } from "../menu/MenuProvider";
import { useUser } from "../../../../users/providers/UserProvider";
import useUsers from "../../../../users/hooks/useUsers";

const Logged = () => {
  const setOpen = useMenu();
  const { user } = useUser();
  const { handleGetUserDisplay } = useUsers();
  const [userDisplay, setUserDisplay] = useState(null);

  useEffect(() => {
    if (!userDisplay) {
      handleGetUserDisplay(user._id).then((data) => {
        setUserDisplay(data);
      });
    }
  }, []);

  if (!userDisplay) return null;
  return (
    <Tooltip title="Open settings">
      <IconButton
        sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}
        onClick={() => setOpen(true)}
      >
        <Avatar
          alt={userDisplay.image.alt}
          src={userDisplay.image.url}
          sx={{ display: "inline-block" }}
        />
      </IconButton>
    </Tooltip>
  );
};

export default Logged;
