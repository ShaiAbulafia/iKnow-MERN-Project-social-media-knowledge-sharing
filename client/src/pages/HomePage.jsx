import React from "react";
import PageHeader from "../components/PageHeader";
import Grid from "@mui/material/Grid";
import { Paper, Typography } from "@mui/material";
import { useTheme } from "../providers/ThemeProvider";
import { Link } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import TopComponents from "../components/TopComponents";

const HomePage = () => {
  const { isDark } = useTheme();
  return (
    <>
      <PageHeader title="iKnow" subtitle="Knowledge sharing site" />

      <Grid container spacing={2} textAlign="center" mt={3}>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              border: 2,
              borderRadius: 5,
              borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
              backgroundColor: isDark
                ? "darkModeColor.main"
                : "thirdColor.main",
            }}
            style={{
              padding: 15,
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              Welcome to the iKnow - where you can expand and share your
              knowledge!
            </Typography>
            <Typography variant="body1">
              Here you can find diverse database of users posts which you can
              view and rate.
            </Typography>
            <Typography variant="body1">
              Post your knowledge and earn K-Points for huge discounts!
            </Typography>
            <Link
              to={ROUTES.ABOUT}
              style={{
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              <Typography
                variant="body1"
                color="primary"
                fontWeight={700}
                mt={3}
              >
                New to the site? learn everything now
              </Typography>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" fontWeight={700} color="success.main">
            $ Earn discounts with knowledge $
          </Typography>
          <Typography variant="body1">
            We have variety of products for you to purchase using your knowledge
            points.
          </Typography>
          <Link
            to={ROUTES.PRODUCTS}
            style={{ textDecoration: "none", display: "inline-block" }}
          >
            <Typography variant="body1" color="primary" fontWeight={700} mt={3}>
              Check store
            </Typography>
          </Link>
        </Grid>
        <TopComponents />
      </Grid>
    </>
  );
};

export default HomePage;
