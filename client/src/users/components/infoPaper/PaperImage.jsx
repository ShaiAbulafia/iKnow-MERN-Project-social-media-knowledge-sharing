import React from "react";
import viewUserType from "../../models/types/viewUserType";
import CardMedia from "@mui/material/CardMedia";
import { Paper } from "@mui/material";
import { useTheme } from "../../../providers/ThemeProvider";

const PaperImage = ({ user }) => {
  const { isDark } = useTheme();
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          border: 2,
          borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
          backgroundColor: isDark ? "darkModeColor.main" : "white",
        }}
      >
        <CardMedia
          component="img"
          image={user.image.url}
          alt={user.image.alt}
          sx={{
            objectFit: "cover",
            maxHeight: 400,
          }}
        />
      </Paper>
    </>
  );
};

PaperImage.propTypes = {
  user: viewUserType.isRequired,
};

export default PaperImage;
