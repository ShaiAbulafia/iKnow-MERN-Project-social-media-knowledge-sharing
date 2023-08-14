import React from "react";
import useForm from "../../forms/hooks/useForm";
import initialContactForm from "./../helpers/initialForms/initialContactForm";
import contactSchema from "../models/joi-schemas/contactSchema";
import useContacts from "./../hooks/useContacts";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Container, Paper } from "@mui/material";
import ContactForm from "../components/ContactForm";
import { useTheme } from "../../providers/ThemeProvider";

const CreateContactPage = () => {
  const { isDark } = useTheme();
  const { handleCreateContact } = useContacts();
  const { user } = useUser();
  const { value, ...rest } = useForm(
    initialContactForm,
    contactSchema,
    handleCreateContact
  );

  if (!user) return <Navigate replace to={ROUTES.POSTS} />;

  return (
    <Container
      sx={{
        pt: 5,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          border: 2,
          borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
          backgroundColor: isDark ? "" : "thirdColor.main",
        }}
        style={{
          paddingLeft: 50,
          paddingRight: 50,
          paddingBottom: 20,
        }}
      >
        <ContactForm
          onSubmit={rest.onSubmit}
          onReset={rest.handleReset}
          errors={value.errors}
          onFormChange={rest.validateForm}
          onInputChange={rest.handleChange}
          data={value.data}
          title={"Contact Us"}
        />
      </Paper>
    </Container>
  );
};

export default CreateContactPage;
