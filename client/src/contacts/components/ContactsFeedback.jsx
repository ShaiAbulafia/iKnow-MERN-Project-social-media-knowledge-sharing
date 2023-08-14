import React, { useState } from "react";
import { arrayOf, string, bool, func } from "prop-types";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import Typography from "@mui/material/Typography";
import contactType from "../models/types/contactType";
import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import { useTheme } from "../../providers/ThemeProvider";
import ContactsMenu from "./ContactsMenu";
import TableHead from "./table/TableHead";
import TableRow from "./table/TableRow";

const ContactsFeedback = ({ isLoading, error, contacts, onRead }) => {
  const { isDark } = useTheme();
  const [showRead, setShowRead] = useState(true);

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (contacts && !contacts.length)
    return (
      <>
        <ContactsMenu setShowRead={setShowRead} showRead={showRead} />
        <Paper
          elevation={3}
          sx={{
            border: 2,
            borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
            backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
          }}
          style={{
            padding: 50,
          }}
        >
          <Typography variant="h5" textAlign="center">
            Oops.. there are no users contacts in database that match the
            parameters you entered!
          </Typography>
        </Paper>
      </>
    );

  return (
    <>
      <ContactsMenu setShowRead={setShowRead} showRead={showRead} />
      <TableContainer component={Paper} sx={{ marginTop: 3 }} elevation={3}>
        <Table
          sx={{
            tableLayout: "fixed",
            minWidth: 650,
            border: 3,
            borderColor: isDark ? "darkModeColor.main" : "mainColor.main",
          }}
          aria-label="Contacts table"
        >
          <TableHead />
          {contacts && (
            <TableBody>
              {showRead ? (
                <>
                  {contacts
                    .filter((contact) => contact.read === false)
                    .sort((a, b) => {
                      const dateA = new Date(a.createdAt);
                      const dateB = new Date(b.createdAt);
                      return dateB - dateA;
                    })
                    .map((contact) => (
                      <TableRow
                        contact={contact}
                        key={contact._id}
                        onRead={onRead}
                        setShowRead={setShowRead}
                      />
                    ))}
                </>
              ) : (
                <>
                  {contacts
                    .sort((a, b) => {
                      const dateA = new Date(a.createdAt);
                      const dateB = new Date(b.createdAt);
                      return dateB - dateA;
                    })
                    .map((contact) => (
                      <TableRow
                        contact={contact}
                        key={contact._id}
                        onRead={onRead}
                        setShowRead={setShowRead}
                      />
                    ))}
                </>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

ContactsFeedback.propTypes = {
  contacts: arrayOf(contactType),
  isLoading: bool.isRequired,
  error: string,
  onRead: func.isRequired,
};

export default ContactsFeedback;
