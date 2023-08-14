import React, { useState } from "react";
import { func } from "prop-types";
import postType from "../../models/types/postType";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useUser } from "../../../users/providers/UserProvider";

const RateSection = ({ post, onRate }) => {
  const [rate, setRate] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const { user } = useUser();
  const currRate = () => {
    if (!user) return null;
    return post.usersRate.find((userRate) => userRate.userId === user._id);
  };
  return (
    <Grid container spacing={2} mb={5}>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          color="text.secondary"
          textAlign="center"
          fontWeight={700}
        >
          Post Rate
        </Typography>
      </Grid>
      {!isOpen && (
        <>
          <Grid item xs={12}>
            <Typography
              variant="h3"
              color="primary"
              textAlign="center"
              fontWeight={700}
            >
              {Number(post.rate).toFixed(2)}
              <StarIcon fontSize="large" />
            </Typography>
          </Grid>
          {currRate() && (
            <Grid item xs={12}>
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
                fontWeight={700}
              >
                You rated this post: {currRate().rate}/10
              </Typography>
            </Grid>
          )}

          {user && user._id !== post.userId && (
            <Grid item xs={12} textAlign="center">
              <Button variant="contained" onClick={() => setOpen(true)}>
                Rate now
              </Button>
            </Grid>
          )}
        </>
      )}
      {isOpen && (
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box display={{ xs: "none", md: "flex" }} alignItems="center">
            {(() => {
              let starIcons = [];
              for (let i = 1; i <= 10; i++) {
                starIcons.push(
                  <IconButton key={`starIcons${i}`} onClick={() => setRate(i)}>
                    {rate >= i ? (
                      <StarIcon fontSize="large" />
                    ) : (
                      <StarBorderIcon fontSize="large" />
                    )}
                  </IconButton>
                );
              }
              return starIcons;
            })()}
          </Box>
          <Box display={{ xs: "flex", md: "none" }} alignItems="center">
            <IconButton
              onClick={() =>
                setRate((prev) => {
                  if (prev === 0) return prev;
                  return prev - 1;
                })
              }
              sx={{ mx: 2 }}
            >
              <RemoveIcon fontSize="large" />
            </IconButton>
            <Typography variant="h4" component="span">
              {rate}
            </Typography>
            <IconButton
              onClick={() =>
                setRate((prev) => {
                  if (prev === 10) return prev;
                  return prev + 1;
                })
              }
              sx={{ mx: 2 }}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              onRate(rate);
            }}
            sx={{ ml: 2 }}
          >
            <Typography variant="body1">Rate</Typography>
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

RateSection.propTypes = {
  post: postType,
  onRate: func.isRequired,
};

export default RateSection;
