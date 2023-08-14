import React, { useEffect, useCallback } from "react";
import ContactsFeedback from "../components/ContactsFeedback";
import useContacts from "../hooks/useContacts";
import { Box } from "@mui/material";

const ContactsPage = () => {
  const { valueContact, handleGetContacts } = useContacts();

  useEffect(() => {
    handleGetContacts();
  }, []);

  const onRead = useCallback(async () => {
    await handleGetContacts();
  }, [handleGetContacts]);

  return (
    <Box pt={10}>
      <ContactsFeedback
        isLoading={valueContact.isLoading}
        contacts={valueContact.contacts}
        error={valueContact.error}
        onRead={onRead}
      />
    </Box>
  );
};

export default ContactsPage;
