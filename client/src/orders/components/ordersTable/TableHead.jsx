import React from "react";
import TableCell from "@mui/material/TableCell";
import MuiTableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "../../../providers/ThemeProvider";
import { useUser } from "../../../users/providers/UserProvider";

const TableHead = () => {
  const { isDark } = useTheme();
  const { user } = useUser();
  return (
    <>
      <MuiTableHead>
        <TableRow
          sx={{
            backgroundColor: isDark ? "darkModeColor.main" : "forthColor.main",
          }}
        >
          <TableCell align="center" sx={{ fontSize: 18, fontWeight: 700 }}>
            Order no.
          </TableCell>
          <TableCell align="center" sx={{ fontSize: 18, fontWeight: 700 }}>
            Date
          </TableCell>
          <TableCell align="center" sx={{ fontSize: 18, fontWeight: 700 }}>
            status
          </TableCell>
          {user && !user.isAdmin && (
            <TableCell align="center" sx={{ fontSize: 18, fontWeight: 700 }}>
              Watch cart
            </TableCell>
          )}
          {user && user.isAdmin && (
            <TableCell
              align="center"
              sx={{ fontSize: 18, fontWeight: 700, width: 200 }}
            >
              Manage
            </TableCell>
          )}
        </TableRow>
      </MuiTableHead>
    </>
  );
};

export default TableHead;
