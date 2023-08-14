import React, { useState } from "react";
import { func, number, object, string } from "prop-types";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import { Typography, Grid, Button, Divider } from "@mui/material";
import SectionForm from "./SectionForm";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DialogRemove from "./DialogRemove";

const PostForm = ({
  onSubmit,
  onReset,
  errors,
  onFormChange,
  onInputChange,
  data,
  title,
  tagC,
  sectionC,
}) => {
  const [countTags, setCountTags] = useState(tagC);
  const [countSections, setCountSections] = useState(sectionC);
  const [isRemoveOpen, setDialogRemove] = useState(false);

  const handleDialogRemove = (term) => {
    if (term === "open") return setDialogRemove(true);
    setDialogRemove(false);
  };

  const handleRemoveSection = async () => {
    handleDialogRemove();
    setCountSections((prev) => {
      if (prev === 1) return prev;
      data[`section${prev}_title`] = "";
      data[`section${prev}_text`] = "";
      data[`section${prev}_image_url`] = "";
      data[`section${prev}_image_alt`] = "";
      data[`section${prev}_video`] = "";
      return prev - 1;
    });
  };
  return (
    <>
      <Form
        spacing={3}
        onSubmit={onSubmit}
        onReset={onReset}
        errors={errors}
        onChange={onFormChange}
        title={title}
      >
        <Input
          name="title"
          label="title"
          error={errors.title}
          onChange={onInputChange}
          data={data}
          sm={12}
        />
        <Input
          name="subtitle"
          label="subtitle"
          error={errors.subtitle}
          onChange={onInputChange}
          data={data}
          sm={12}
        />

        {(() => {
          let tagsInputs = [];
          for (let i = 1; i <= countTags; i++) {
            tagsInputs.push(
              <Input
                key={`tag${i}`}
                name={`tag${i}`}
                label={`tag #${i}`}
                error={errors[`tag${i}`]}
                onChange={onInputChange}
                data={data}
                required={false}
                sm={4}
                md={3}
                lg={2}
              />
            );
          }
          return tagsInputs;
        })()}
        {countTags < 5 && (
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() =>
                setCountTags((prev) => {
                  if (prev === 5) return prev;
                  return prev + 1;
                })
              }
            >
              <AddIcon />
              <Typography variant="body1" component="span">
                Tag
              </Typography>
            </Button>
          </Grid>
        )}
        {countTags > 0 && (
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={() =>
                setCountTags((prev) => {
                  if (prev === 0) return prev;
                  data[`tag${prev}`] = "";
                  return prev - 1;
                })
              }
            >
              <RemoveIcon />
              <Typography variant="body1" component="span">
                Tag
              </Typography>
            </Button>
          </Grid>
        )}
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {(() => {
          let sectionsInputs = [];
          for (let i = 1; i <= countSections; i++) {
            sectionsInputs.push(
              <SectionForm
                key={`postSection${i}`}
                errors={errors}
                onInputChange={onInputChange}
                data={data}
                sectionNum={i}
              />
            );
          }
          return sectionsInputs;
        })()}

        {countSections < 5 && (
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() =>
                setCountSections((prev) => {
                  if (prev === 5) return prev;
                  return prev + 1;
                })
              }
            >
              <AddIcon />
              <Typography variant="body1" component="span">
                Section
              </Typography>
            </Button>
          </Grid>
        )}
        {countSections > 1 && (
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={() => handleDialogRemove("open")}
            >
              <RemoveIcon />
              <Typography variant="body1" component="span">
                Section
              </Typography>
            </Button>
          </Grid>
        )}
      </Form>
      <DialogRemove
        isDialogOpen={isRemoveOpen}
        onChangeDialog={handleDialogRemove}
        onRemove={handleRemoveSection}
      />
    </>
  );
};

PostForm.propTypes = {
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  errors: object.isRequired,
  onFormChange: func.isRequired,
  onInputChange: func.isRequired,
  data: object.isRequired,
  title: string,
  sectionC: number.isRequired,
  tagC: number.isRequired,
};

PostForm.defaultProps = {
  sectionC: 1,
  tagC: 0,
};

export default React.memo(PostForm);
