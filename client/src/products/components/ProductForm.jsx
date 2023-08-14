import React from "react";
import { func, object, string } from "prop-types";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";

const ProductForm = ({
  onSubmit,
  onReset,
  errors,
  onFormChange,
  onInputChange,
  data,
  title,
}) => {
  return (
    <Form
      spacing={3}
      onSubmit={onSubmit}
      onReset={onReset}
      errors={errors}
      onChange={onFormChange}
      styles={{ maxWidth: "800px" }}
      title={title}
    >
      <Input
        name="title"
        label="title"
        error={errors.title}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="subtitle"
        label="subtitle"
        error={errors.subtitle}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="category"
        label="category"
        error={errors.category}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="brand"
        label="brand"
        error={errors.brand}
        onChange={onInputChange}
        data={data}
        sm={6}
      />

      <Input
        name="price"
        label="price"
        type="price"
        error={errors.price}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="stock"
        label="stock"
        type="number"
        error={errors.stock}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="imageUrl"
        label="image url"
        error={errors.imageUrl}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="imageAlt"
        label="image alt"
        error={errors.imageAlt}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="description"
        label="description"
        error={errors.description}
        onChange={onInputChange}
        data={data}
        sm={12}
        rows={8}
        multiline={true}
      />
    </Form>
  );
};

ProductForm.propTypes = {
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  errors: object.isRequired,
  onFormChange: func.isRequired,
  onInputChange: func.isRequired,
  data: object.isRequired,
  title: string,
};

export default React.memo(ProductForm);
