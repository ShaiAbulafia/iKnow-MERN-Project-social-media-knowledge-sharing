import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import MuiTableRow from "@mui/material/TableRow";
import contactType from "../../models/types/contactType";
import { IconButton, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import useContacts from "../../hooks/useContacts";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import DraftsIcon from "@mui/icons-material/Drafts";
import { func } from "prop-types";
import { Link } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";

const TableRow = ({ contact, onRead, setShowRead }) => {
  const date = new Date(contact.createdAt);
  const [isRead, setRead] = useState(contact.read);
  const { handleReadContact } = useContacts();
  const handleRead = async () => {
    if (isRead) return;
    await handleReadContact(contact._id).then(setRead((prev) => !prev));
    onRead();
  };

  return (
    <>
      <MuiTableRow>
        <TableCell align="center">
          <Link
            to={`${ROUTES.ADMIN}/users?u=${contact.userId}`}
            style={{ textDecoration: "none", color: "primary" }}
          >
            <Typography variant="body2" color="primary">
              {contact.userId}
            </Typography>
          </Link>
        </TableCell>
        <TableCell align="center">{contact.title}</TableCell>
        <TableCell align="center">{contact.text}</TableCell>
        <TableCell align="center">{date.toLocaleString()}</TableCell>
        <TableCell align="center">
          {isRead ? (
            <DraftsIcon sx={{ color: "text.secondary" }} />
          ) : (
            <IconButton aria-label="mark as read" onClick={handleRead}>
              <MarkEmailReadIcon sx={{ color: "primary.main" }} />
            </IconButton>
          )}
        </TableCell>
      </MuiTableRow>
    </>
  );
};

TableRow.propTypes = {
  contact: contactType.isRequired,
  onRead: func.isRequired,
  setShowRead: func.isRequired,
};

export default TableRow;
