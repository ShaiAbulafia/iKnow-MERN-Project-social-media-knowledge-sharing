import React from "react";
import { arrayOf, func } from "prop-types";
import MuiTable from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import fullProductsList from "../../models/types/fullProductsList";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import TableBody from "@mui/material/TableBody";
import { useTheme } from "../../../providers/ThemeProvider";

const Table = ({ products, onUpdate, onRemove }) => {
  const { isDark } = useTheme();

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 3 }} elevation={3}>
        <MuiTable
          sx={{
            tableLayout: "fixed",
            minWidth: 600,
            border: 3,
            borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
            backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
          }}
          aria-label="Users table"
        >
          <TableHead />
          <TableBody>
            {products.map((cartProduct) => (
              <TableRow
                key={cartProduct.product._id}
                product={cartProduct.product}
                amount={cartProduct.amount}
                onUpdate={onUpdate}
                onRemove={onRemove}
              />
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </>
  );
};

Table.propTypes = {
  products: arrayOf(fullProductsList).isRequired,
  onUpdate: func.isRequired,
  onRemove: func.isRequired,
};

export default Table;
