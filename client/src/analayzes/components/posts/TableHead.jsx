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
            Post titles
          </TableCell>
          <TableCell align="center" sx={{ fontSize: 18, fontWeight: 700 }}>
            by
          </TableCell>
          <TableCell align="center" sx={{ fontSize: 18, fontWeight: 700 }}>
            rate
          </TableCell>
          <TableCell align="center" sx={{ fontSize: 18, fontWeight: 700 }}>
            favorites
          </TableCell>
        </TableRow>
      </MuiTableHead>
    </>
  );
};

export default TableHead;
