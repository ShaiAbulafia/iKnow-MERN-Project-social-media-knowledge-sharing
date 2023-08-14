import React from "react";
import { func, object, string } from "prop-types";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";

const UserForm = ({
  onSubmit,
  onReset,
  onFormChange,
  errors,
  data,
  onInputChange,
  title,
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      onReset={onReset}
      onChange={onFormChange}
      styles={{ maxWidth: "600px" }}
      to={ROUTES.ROOT}
      title={title}
      spacing={3}
    >
      <Input
        name="email"
        label="email"
        type="email"
        error={errors.email}
        onChange={onInputChange}
        data={data}
      />

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
      <Input
        name="password"
        label="New password"
        type="password"
        error={errors.password}
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
