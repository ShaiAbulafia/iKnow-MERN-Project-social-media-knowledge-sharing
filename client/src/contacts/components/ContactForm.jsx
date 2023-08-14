import React from "react";
import { func, object, string } from "prop-types";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";

const ContactForm = ({
  onSubmit,
  onReset,
  errors,
  onFormChange,
  onInputChange,
  data,
  title,
}) => {
  return (
    <>
      <Form
        spacing={3}
        onSubmit={onSubmit}
        onReset={onReset}
        errors={errors}
        onChange={onFormChange}
        title={title}
        styles={{ maxWidth: "400px" }}
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
          name="text"
          label="text"
          error={errors.text}
          onChange={onInputChange}
          data={data}
          sm={12}
          multiline={true}
          rows={8}
        />
      </Form>
    </>
  );
};

ContactForm.propTypes = {
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  errors: object.isRequired,
  onFormChange: func.isRequired,
  onInputChange: func.isRequired,
  data: object.isRequired,
  title: string,
};

export default React.memo(ContactForm);
