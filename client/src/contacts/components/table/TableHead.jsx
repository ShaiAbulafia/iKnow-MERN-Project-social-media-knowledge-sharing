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
            userId
          </TableCell>
          <TableCell align="center" sx={{ fontSize: 18, fontWeight: 700 }}>
            Title
          </TableCell>
          <TableCell align="center" sx={{ fontSize: 18, fontWeight: 700 }}>
            Text
          </TableCell>
          <TableCell align="center" sx={{ fontSize: 18, fontWeight: 700 }}>
            Date
          </TableCell>
          <TableCell align="center" sx={{ fontSize: 18, fontWeight: 700 }}>
            Mark as read
          </TableCell>
        </TableRow>
      </MuiTableHead>
    </>
  );
};

export default TableHead;
