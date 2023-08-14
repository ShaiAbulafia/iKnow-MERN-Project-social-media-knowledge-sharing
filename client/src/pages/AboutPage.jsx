import React from "react";
import PageHeader from "./../components/PageHeader";
import Grid from "@mui/material/Grid";
import { Box, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ROUTES from "../routes/routesModel";

const AboutPage = () => {
  return (
    <Box pt={6}>
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" fontWeight={700}>
                iKnow - expand and share your knowledge!
              </Typography>
              <Typography variant="body1">
                Here you can find diverse database of users posts which you can
                view, and rate.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" fontWeight={700}>
                Why should I register?
              </Typography>
              <Typography variant="body1">
                Registered users can make new posts and earn K-Points (knowledge
                points) to spent at the store. You must be registered in order
                to make any purchases. further more, users can rate posts and
                add posts or products to favorites for easy access.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" fontWeight={700}>
                View users profiles and follow their posts!
              </Typography>
              <Typography variant="body1">
                Registered users can follow other users and get notification on
                every post they publish!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" fontWeight={700}>
                Post your knowledge!
              </Typography>
              <Typography variant="body1" mb={2}>
                Share your knowledge with the world and earn knowledge points
                (K-Points).
              </Typography>
              <img
                src="/assets/images/postExample.PNG"
                alt="post example"
                width="100%"
              />
              <Link
                to={`${ROUTES.POSTS}/all_posts`}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="h5"
                  color="primary"
                  fontWeight={700}
                  mt={3}
                  mb={1}
                >
                  View posts
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" fontWeight={700}>
                How it works?
              </Typography>
              <Typography variant="body1">
                You will get K-Points each time user rate your post. The amount
                depence on the rate from 1 to 10. Post your most usefull or
                interesting knowledge to earn higher K-Points.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" fontWeight={700}>
                Spend you K-Points!
              </Typography>
              <Typography variant="body1">
                Every 100 K-Points earns you 1$ discount on your total cart
                bill. You can make purchases with or without spending your
                K-Points. At the store you can see the cost of getting full
                discount with K-Points on each product.
              </Typography>
              <Link to={ROUTES.PRODUCTS} style={{ textDecoration: "none" }}>
                <Typography
                  variant="h5"
                  color="primary"
                  fontWeight={700}
                  mt={3}
                  mb={1}
                >
                  Go to store
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: { md: "flex", xs: "none" },
            justifyContent: "center",
          }}
        >
          <CardMedia
            component="img"
            image="/assets/images/productExample.PNG"
            alt="product example"
            sx={{
              objectFit: "contain",
              maxHeight: 450,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutPage;
