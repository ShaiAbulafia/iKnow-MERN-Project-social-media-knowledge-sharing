import React, { useState } from "react";
import { func, number, object } from "prop-types";
import Input from "../../forms/components/Input";
import { Button, Grid, Typography, Divider } from "@mui/material";
import { useTheme } from "../../providers/ThemeProvider";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import YouTubeIcon from "@mui/icons-material/YouTube";

const SectionForm = ({ errors, onInputChange, data, sectionNum }) => {
  const { isDark } = useTheme();

  const [isText, setIsText] = useState(
    !(
      data[`section${sectionNum}_text`] === "" ||
      data[`section${sectionNum}_text`] === undefined
    )
  );
  const [isImage, setIsImage] = useState(
    !(
      data[`section${sectionNum}_image_url`] === "" ||
      data[`section${sectionNum}_image_url`] === undefined
    )
  );
  const [isVideo, setIsVideo] = useState(
    !(
      data[`section${sectionNum}_video`] === "" ||
      data[`section${sectionNum}_video`] === undefined
    )
  );

  return (
    <>
      <Grid item xs={12}>
        <Typography
          align="center"
          variant="h4"
          m={4}
          color={isDark ? "white" : "forthColor.main"}
        >
          Section #{sectionNum}
        </Typography>
      </Grid>
      <Input
        name={`section${sectionNum}_title`}
        label="title"
        error={errors[`section${sectionNum}_title`]}
        onChange={onInputChange}
        data={data}
        sm={12}
      />
      {!isText && (
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setIsText(true)}
          >
            <AddIcon />
            <Typography variant="body1" component="span">
              Text
            </Typography>
          </Button>
        </Grid>
      )}
      {isText && (
        <>
          <Input
            name={`section${sectionNum}_text`}
            label="text"
            error={errors[`section${sectionNum}_text`]}
            onChange={onInputChange}
            data={data}
            required={false}
            sm={12}
            rows={10}
            multiline={true}
          />
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={() => setIsText(false)}
            >
              <RemoveIcon />
              <Typography variant="body1" component="span">
                Text
              </Typography>
            </Button>
          </Grid>
        </>
      )}

      {!isImage && (
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setIsImage(true)}
          >
            <AddIcon />
            <Typography variant="body1" component="span">
              Image
            </Typography>
          </Button>
        </Grid>
      )}

      {isImage && (
        <>
          <Input
            name={`section${sectionNum}_image_url`}
            label="image url"
            error={errors[`section${sectionNum}_image_url`]}
            onChange={onInputChange}
            data={data}
            sm={12}
            required={false}
          />
          <Input
            name={`section${sectionNum}_image_alt`}
            label="image alt"
            error={errors[`section${sectionNum}_image_alt`]}
            onChange={onInputChange}
            data={data}
            sm={12}
            required={false}
          />
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={() => setIsImage(false)}
            >
              <RemoveIcon />
              <Typography variant="body1" component="span">
                Image
              </Typography>
            </Button>
          </Grid>
        </>
      )}

      {!isVideo && (
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setIsVideo(true)}
          >
            <AddIcon />
            <Typography variant="body1" component="span">
              YouTube
            </Typography>
            <YouTubeIcon />
          </Button>
        </Grid>
      )}
      {isVideo && (
        <>
          <Input
            name={`section${sectionNum}_video`}
            label="you tube link"
            error={errors[`section${sectionNum}_video`]}
            onChange={onInputChange}
            data={data}
            sm={12}
            required={false}
          />
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={() => setIsVideo(false)}
            >
              <RemoveIcon />
              <Typography variant="body1" component="span">
                YouTube
              </Typography>
              <YouTubeIcon />
            </Button>
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </>
  );
};

SectionForm.propTypes = {
  errors: object.isRequired,
  onInputChange: func.isRequired,
  data: object.isRequired,
  sectionNum: number.isRequired,
};

export default React.memo(SectionForm);
