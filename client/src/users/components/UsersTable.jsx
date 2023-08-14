import React from "react";
import { arrayOf, func } from "prop-types";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import userType from "../models/types/userType";
import { Typography } from "@mui/material";
import UserSearchBar from "./UserSearchbar";
import TableHead from "./table/TableHead";
import TableRow from "./table/TableRow";
import TableBody from "@mui/material/TableBody";
import { useTheme } from "../../providers/ThemeProvider";
const UsersTable = ({ users, onDelete }) => {
  const { isDark } = useTheme();
  return (
    <>
      <UserSearchBar />
      {!users.length && (
        <Paper
          elevation={3}
          sx={{
            border: 2,
            borderColor: isDark ? "darkModeColor.main" : "mainColor.main",
            backgroundColor: isDark ? "darkModeColor.main" : "white",
          }}
          style={{
            padding: 50,
          }}
        >
          <Typography variant="h5" textAlign="center">
            Oops.. there are no users in database that match the parameters you
            entered!
          </Typography>
        </Paper>
      )}
      {!!users.length && (
        <TableContainer component={Paper} sx={{ marginTop: 3 }} elevation={3}>
          <Table
            sx={{
              tableLayout: "fixed",
              minWidth: 800,
              border: 3,
              borderColor: isDark ? "darkModeColor.main" : "mainColor.main",
            }}
            aria-label="Users table"
          >
            <TableHead />
            <TableBody>
              {users.map((user) => (
                <TableRow onDelete={onDelete} user={user} key={user._id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

UsersTable.propTypes = {
  users: arrayOf(userType),
  onDelete: func.isRequired,
};

export default UsersTable;
