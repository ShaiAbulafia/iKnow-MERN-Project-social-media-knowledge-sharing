import React from "react";
import { func, object, string } from "prop-types";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";

const AddressForm = ({
  onSubmit,
  onReset,
  onFormChange,
  errors,
  data,
  onInputChange,
}) => {
  return (
    <Form
      spacing={2}
      onSubmit={onSubmit}
      onReset={onReset}
      onChange={onFormChange}
      title={"Contact"}
      to={ROUTES.ABOUT}
    >
      <Input
        name="phone"
        label="phone"
        type="phone"
        error={errors.phone}
        onChange={onInputChange}
        data={data}
        sm={6}
        md={4}
        lg={3}
      />

      <Input
        name="state"
        label="state"
        error={errors.state}
        onChange={onInputChange}
        data={data}
        sm={6}
        md={4}
        lg={3}
      />
      <Input
        label="country"
        name="country"
        error={errors.country}
        onChange={onInputChange}
        data={data}
        sm={6}
        md={4}
        lg={3}
      />
      <Input
        name="city"
        label="city"
        error={errors.city}
        onChange={onInputChange}
        data={data}
        sm={6}
        md={4}
        lg={3}
      />
      <Input
        name="street"
        label="street"
        error={errors.street}
        onChange={onInputChange}
        data={data}
        sm={6}
        md={4}
        lg={3}
      />
      <Input
        name="houseNumber"
        label="house Number"
        type="number"
        error={errors.houseNumber}
        onChange={onInputChange}
        data={data}
        sm={6}
        md={4}
        lg={3}
      />
      <Input
        name="zip"
        label="zip"
        error={errors.zip}
        onChange={onInputChange}
        data={data}
        sm={6}
        md={4}
        lg={3}
      />
    </Form>
  );
};

AddressForm.propTypes = {
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  onFormChange: func.isRequired,
  title: string,
  errors: object.isRequired,
  data: object.isRequired,
  onInputChange: func.isRequired,
  setData: func.isRequired,
};

export default React.memo(AddressForm);
