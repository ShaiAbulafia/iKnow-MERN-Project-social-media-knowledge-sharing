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
            backgroundColor: isDark ? "darkModeColor.main" : "forthColor.main",
          }}
        >
          <TableCell align="center" sx={{ fontSize: 18, fontWeight: 700 }}>
            Product No.
          </TableCell>
          <TableCell align="center" sx={{ fontSize: 18, fontWeight: 700 }}>
            Title
          </TableCell>
          <TableCell align="center" sx={{ fontSize: 18, fontWeight: 700 }}>
            Subtitle
          </TableCell>
          <TableCell align="center" sx={{ fontSize: 18, fontWeight: 700 }}>
            Image
          </TableCell>
          <TableCell align="center" sx={{ fontSize: 18, fontWeight: 700 }}>
            Price
          </TableCell>
          <TableCell align="center" sx={{ fontSize: 18, fontWeight: 700 }}>
            Qt.
          </TableCell>
        </TableRow>
      </MuiTableHead>
    </>
  );
};

export default TableHead;
