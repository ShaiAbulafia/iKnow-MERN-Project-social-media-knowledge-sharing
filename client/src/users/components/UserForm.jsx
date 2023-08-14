import React from "react";
import { func, object, string } from "prop-types";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";
import { Typography } from "@mui/material";
import { useTheme } from "../../providers/ThemeProvider";

const UserForm = ({
  onSubmit,
  onReset,
  onFormChange,
  errors,
  data,
  onInputChange,
}) => {
  const { isDark } = useTheme();

  return (
    <Form
      onSubmit={onSubmit}
      onReset={onReset}
      onChange={onFormChange}
      styles={{ maxWidth: "600px" }}
      to={ROUTES.ABOUT}
    >
      <Grid item xs={12} pt={0}>
        <Typography
          fontWeight={700}
          variant="h4"
          align="center"
          color={isDark ? "white" : "forthColor.main"}
        >
          Name
        </Typography>
      </Grid>
      <Input
        name="first"
        label="first name"
        error={errors.first}
        onChange={onInputChange}
        data={data}
      />
      <Input
        name="middle"
        label="middle name"
        error={errors.middle}
        onChange={onInputChange}
        data={data}
        required={false}
      />
      <Input
        name="last"
        label="last name"
        error={errors.last}
        onChange={onInputChange}
        data={data}
      />

      <Grid item xs={12} marginTop={3}>
        <Typography
          fontWeight={700}
          variant="h4"
          align="center"
          color={isDark ? "white" : "forthColor.main"}
        >
          About
        </Typography>
      </Grid>
      <Input
        name="aboutMe"
        label="about me"
        error={errors.aboutMe}
        onChange={onInputChange}
        data={data}
        rows={4}
        multiline={true}
      />

      <Grid item xs={12} marginTop={3}>
        <Typography
          fontWeight={700}
          variant="h4"
          align="center"
          color={isDark ? "white" : "forthColor.main"}
        >
          User info
        </Typography>
      </Grid>
      <Input
        name="email"
        label="email"
        type="email"
        error={errors.email}
        onChange={onInputChange}
        data={data}
      />
      <Input
        name="password"
        label="password"
        type="password"
        error={errors.password}
        onChange={onInputChange}
        data={data}
      />
      <Grid item xs={12} marginTop={3}>
        <Typography
          fontWeight={700}
          variant="h4"
          align="center"
          color={isDark ? "white" : "forthColor.main"}
        >
          User Image
        </Typography>
      </Grid>
      <Input
        name="url"
        label="image url"
        error={errors.url}
        onChange={onInputChange}
        data={data}
        required={false}
      />
      <Input
        name="alt"
        label="image alt"
        error={errors.alt}
        onChange={onInputChange}
        data={data}
        required={false}
      />
      <Grid item xs={12} marginTop={3}>
        <Typography
          fontWeight={700}
          variant="h4"
          align="center"
          color={isDark ? "white" : "forthColor.main"}
        >
          Security questions
        </Typography>
      </Grid>
      <Input
        name="grandfatherName"
        label="Grandfather name"
        error={errors.grandfatherName}
        onChange={onInputChange}
        data={data}
      />
      <Input
        name="firstSchool"
        label="First school name"
        error={errors.firstSchool}
        onChange={onInputChange}
        data={data}
      />
      <Input
        name="motherLastName"
        label="Mother last name before marriage"
        error={errors.motherLastName}
        onChange={onInputChange}
        data={data}
      />
    </Form>
  );
};

UserForm.propTypes = {
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  onFormChange: func.isRequired,
  title: string,
  errors: object.isRequired,
  data: object.isRequired,
  onInputChange: func.isRequired,
  setData: func.isRequired,
};

export default React.memo(UserForm);
