import React from "react";
import { Grid, Typography, CardMedia } from "@mui/material";
import {
  makeFirstLetterCapital,
  makeEveryFirstLetterCapital,
} from "../../../utils/algoMethods";
import Divider from "@mui/material/Divider";
import { useTheme } from "../../../providers/ThemeProvider";
import sectionType from "../../models/types/sectionType";

const PaperSection = ({ section }) => {
  const { isDark } = useTheme();
  const videoUrl = () => {
    if (!section.video || section.video === "") return "";
    return section.video.replace("watch?v=", "embed/");
  };

  return (
    <>
      <Divider sx={{ mt: 1, mb: 3 }} />

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <Typography
            variant="h4"
            align="center"
            color="text.secondary"
            sx={{ fontWeight: 900 }}
          >
            {makeEveryFirstLetterCapital(section.title)}
          </Typography>
        </Grid>

        {section.text && section.text !== "" && (
          <>
            <Grid item xs={12} sx={{ mx: { xs: 0, md: 5 } }}>
              <Typography variant="body1" color="text.secondary">
                {makeFirstLetterCapital(section.text)}
              </Typography>
            </Grid>
          </>
        )}
        {section.image.url && section.image.url !== "" && (
          <>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image={section.image.url}
                alt={section.image.alt}
                sx={{
                  height: { xs: 300, md: 450 },
                  border: 4,
                  borderColor: isDark
                    ? "darkModeColor.main"
                    : "forthColor.main",
                }}
              />
            </Grid>
          </>
        )}

        {section.video && section.video !== "" && (
          <>
            <Grid item xs={12} md={8} textAlign="center">
              <iframe
                width="100%"
                height="300"
                src={videoUrl()}
                title="YouTube video player"
                frameBorder="2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

PaperSection.propTypes = {
  section: sectionType.isRequired,
};

export default PaperSection;
