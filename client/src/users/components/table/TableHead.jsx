import React from "react";
import TableCell from "@mui/material/TableCell";
import MuiTableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "../../../providers/ThemeProvider";

const TableHead = () => {
  const { isDark } = useTheme();

  return (
    <>
      <MuiTableHead>
        <TableRow
          sx={{
            backgroundColor: isDark ? "darkModeColor.main" : "mainColor.main",
          }}
        >
          <TableCell align="center" sx={{ fontSize: 18, fontWeight: 700 }}>
            Name
          </TableCell>
          <TableCell align="center" sx={{ fontSize: 18, fontWeight: 700 }}>
            Last name
          </TableCell>
          <TableCell align="center" sx={{ fontSize: 18, fontWeight: 700 }}>
            Email
          </TableCell>
          <TableCell
            align="center"
            sx={{ fontSize: 18, fontWeight: 700, width: 150 }}
          >
            kPoints
          </TableCell>
          <TableCell
            align="center"
            sx={{ fontSize: 18, fontWeight: 700, width: 150 }}
          >
            Blocked?
          </TableCell>
          <TableCell
            align="center"
            sx={{ fontSize: 18, fontWeight: 700, width: 250 }}
          >
            Manage
          </TableCell>
        </TableRow>
      </MuiTableHead>
    </>
  );
};

export default TableHead;
