import React from "react";
import { string } from "prop-types";
import { Typography, Avatar, Box, duration } from "@mui/material";
import { useTheme } from "../providers/ThemeProvider";
import { animated, useSpring } from "react-spring";

const PageHeader = ({ title, subtitle }) => {
  const { isDark } = useTheme();
  const entranceAvatar = useSpring({
    from: { x: "0%", opacity: 1 },
    to: [
      { x: "-50%", opacity: 1 },
      { x: "50%", opacity: 1 },
      { x: "0%", opacity: 1 },
    ],
    config: { duration: 200 },
    delay: 1500,
  });

  const entranceHeader = useSpring({
    from: { x: "0%" },
    to: [{ x: "20%" }, { x: "0%" }],
    config: { duration: 200 },
    delay: 1900,
  });
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" pt={3}>
        <animated.div style={entranceAvatar}>
          <Avatar
            alt="iKnow logo"
            src="/assets/images/iKnowLogo.png"
            variant="square"
            sx={{ width: 70, height: 70 }}
          />
        </animated.div>
        <animated.div style={entranceHeader}>
          <Typography
            variant="h1"
            component="h1"
            ml={3}
            fontWeight={500}
            fontFamily="Preahvihear"
            color={isDark ? "white" : "forthColor.main"}
          >
            {title}
          </Typography>
        </animated.div>
      </Box>

      <Typography
        variant="h5"
        component="h2"
        align="center"
        color={isDark ? "white" : "forthColor.main"}
        marginBottom={1}
      >
        {subtitle}
      </Typography>
    </>
  );
};

PageHeader.propTypes = {
  title: string.isRequired,
  subtitle: string,
};

export default PageHeader;
