import React, { useState } from "react";
import { func } from "prop-types";
import TableCell from "@mui/material/TableCell";
import MuiTableRow from "@mui/material/TableRow";
import userType from "../../models/types/userType";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconButton } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import UserDeleteDialog from "../table/UserDeleteDialog";
import UserGiftDialog from "../table/UserGiftDialog";
import Tooltip from "@mui/material/Tooltip";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import useUsers from "../../hooks/useUsers";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

const TableRow = ({ user, onDelete }) => {
  const navigate = useNavigate();
  const { handleChangeBlock, handleUpdateUserKpoints } = useUsers();
  const [isBlocked, setBlocked] = useState(!!user.blockedTill);
  const [isDialogOpen, setDialog] = useState(false);
  const [isDialogGiftOpen, setDialogGift] = useState(false);
  const [userKP, setUserKP] = useState(user.kPoints);

  const handleDialog = (term) => {
    if (term === "open") return setDialog(true);
    setDialog(false);
  };

  const handleDialogGift = (term) => {
    if (term === "open") return setDialogGift(true);
    setDialogGift(false);
  };

  const handleDeleteUser = () => {
    handleDialog();
    onDelete(user._id);
  };

  const handleGiftUser = (kPoints) => {
    handleDialogGift();
    handleUpdateUserKpoints(user._id, kPoints).then(() => {
      setUserKP((prev) => prev + kPoints);
      if (user.kPoints + kPoints <= 0) {
        setUserKP(0);
      }
    });
  };

  const handleBlockUser = () => {
    handleChangeBlock(user._id, !isBlocked).then(setBlocked((prev) => !prev));
  };

  return (
    <>
      <MuiTableRow>
        <TableCell align="center">{user.name.first}</TableCell>
        <TableCell align="center">{user.name.last}</TableCell>
        <TableCell align="center">{user.email}</TableCell>
        <TableCell align="center">{userKP}</TableCell>
        <TableCell align="center">
          {isBlocked && (
            <IconButton aria-label="blocked" disabled>
              <CheckCircleIcon color="warning" />
            </IconButton>
          )}
        </TableCell>
        <TableCell align="center">
          <Tooltip title="View user profile">
            <IconButton
              aria-label="view user"
              onClick={() =>
                navigate(`${ROUTES.USER_PROFILE}/view/${user._id}`)
              }
            >
              <AccountBoxIcon color="mainColor" />
            </IconButton>
          </Tooltip>

          <Tooltip title="View user info">
            <IconButton
              aria-label="view user"
              onClick={() => navigate(`${ROUTES.USER_PROFILE}/${user._id}`)}
            >
              <RemoveRedEyeIcon color="primary" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Give or take K-Points">
            <IconButton
              aria-label="gift user"
              onClick={() => handleDialogGift("open")}
            >
              <CardGiftcardIcon color="success" />
            </IconButton>
          </Tooltip>

          {!user.isAdmin && (
            <Tooltip title="Change user 24 hours block">
              <IconButton
                aria-label="change user status"
                onClick={handleBlockUser}
              >
                <BlockIcon color="warning" />
              </IconButton>
            </Tooltip>
          )}
          {!user.isAdmin && (
            <Tooltip title="Delete user">
              <IconButton
                aria-label="delete user"
                onClick={() => handleDialog("open")}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          )}
        </TableCell>
      </MuiTableRow>
      <UserDeleteDialog
        isDialogOpen={isDialogOpen}
        onChangeDialog={handleDialog}
        onDelete={handleDeleteUser}
      />
      <UserGiftDialog
        isDialogOpen={isDialogGiftOpen}
        onChangeDialog={handleDialogGift}
        onGift={handleGiftUser}
      />
    </>
  );
};

TableRow.propTypes = {
  user: userType,
  onDelete: func.isRequired,
};

export default TableRow;
