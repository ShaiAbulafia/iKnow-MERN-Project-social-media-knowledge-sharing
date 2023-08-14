import React, { useState, useEffect } from "react";
import { func, object } from "prop-types";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Avatar,
} from "@mui/material";
import { useTheme } from "../../../providers/ThemeProvider";
import { useUser } from "../../../users/providers/UserProvider";
import useUsers from "../../../users/hooks/useUsers";

const CommentForm = ({
  onSubmit,
  errors,
  onFormChange,
  onInputChange,
  onReset,
  data,
}) => {
  const { isDark } = useTheme();
  const { user } = useUser();
  const { handleGetUserDisplay } = useUsers();
  const [userDisplay, setUserDisplay] = useState();

  useEffect(() => {
    handleGetUserDisplay(user._id).then((data) => {
      setUserDisplay(data);
    });
  }, []);
  if (!userDisplay) return null;
  return (
    <>
      <Box component="form" onSubmit={onSubmit} autoComplete="off" noValidate>
        <Grid container spacing={3}>
          <Grid item xs={2} sm={1}>
            <Box sx={{ display: "inline-block" }}>
              <Avatar alt={userDisplay.image.alt} src={userDisplay.image.url} />
            </Box>
          </Grid>
          <Grid item xs={10} sm={9}>
            <TextField
              variant="standard"
              type="text"
              label={"Your Comment..."}
              id={"text"}
              name={"text"}
              value={data["text"] ? data["text"] : ""}
              helperText={errors.text}
              error={Boolean(errors.text)}
              onChange={onInputChange}
              fullWidth
              autoComplete="off"
              size="small"
              color={isDark ? "darkModeColor" : "forthColor"}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              size="large"
              color={isDark ? "primary" : "forthColor"}
              onClick={() => {
                onSubmit();
                onReset();
              }}
              fullWidth
              disabled={!!onFormChange()}
            >
              <Typography color="white">Post</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

CommentForm.propTypes = {
  onSubmit: func.isRequired,
  errors: object.isRequired,
  onFormChange: func.isRequired,
  onInputChange: func.isRequired,
  onReset: func.isRequired,
  data: object.isRequired,
};

export default React.memo(CommentForm);
