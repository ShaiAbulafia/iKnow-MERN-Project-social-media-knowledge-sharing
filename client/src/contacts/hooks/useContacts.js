import { useState, useCallback, useMemo } from "react";
import useAxios from "../../hooks/useAxios";
import { useSnack } from "../../providers/SnackbarProvider";

import {
  createContact,
  getContacts,
  setContactRead,
  getContact,
} from "../services/contactApiService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

const useContacts = () => {
  const [contacts, setContacts] = useState();
  const [contact, setContact] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useAxios();
  const snack = useSnack();
  const navigate = useNavigate();

  const requestStatus = useCallback(
    (loading, errorMessages, contacts, contact = null) => {
      setLoading(loading);
      setError(errorMessages);
      setContacts(contacts);
      setContact(contact);
    },
    []
  );

  const handleGetContacts = useCallback(async () => {
    try {
      setLoading(true);
      const contacts = await getContacts();
      requestStatus(false, null, contacts);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, [requestStatus]);

  const handleGetContact = useCallback(
    async (contactId) => {
      try {
        setLoading(true);
        const contact = await getContact(contactId);
        requestStatus(false, null, null, contact);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [requestStatus]
  );

  const handleCreateContact = useCallback(
    async (contactFromClient) => {
      try {
        setLoading(true);
        const contact = await createContact(contactFromClient);
        snack("success", "Message sent!");
        navigate(`${ROUTES.POSTS}/all_posts`);
        requestStatus(false, null, null, contact);
      } catch (error) {
        requestStatus(false, error, null, null);
      }
    },
    [navigate, requestStatus, snack]
  );

  const handleReadContact = useCallback(async (contactId) => {
    try {
      await setContactRead(contactId);
      snack("success", "Message marked as read!");
    } catch (error) {}
  }, []);

  const valueContact = useMemo(() => {
    return {
      isLoading,
      error,
      contacts,
      contact,
    };
  }, [isLoading, error, contacts, contact]);

  return {
    valueContact,
    handleGetContacts,
    handleGetContact,
    handleCreateContact,
    handleReadContact,
  };
};

export default useContacts;
