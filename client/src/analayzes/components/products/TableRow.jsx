import React from "react";
import { number } from "prop-types";
import TableCell from "@mui/material/TableCell";
import MuiTableRow from "@mui/material/TableRow";
import { CardMedia } from "@mui/material";
import productType from "../../../products/models/types/productType";

const TableRow = ({ product }) => {
  return (
    <>
      <MuiTableRow>
        <TableCell align="center">{product.productNumber}</TableCell>
        <TableCell align="center">{product.title}</TableCell>
        <TableCell sx={{ display: "flex", justifyContent: "center" }}>
          <CardMedia
            component="img"
            alt={product.image.alt}
            image={product.image.url}
            sx={{ width: 100 }}
          />
        </TableCell>
        <TableCell align="center">{product.wishes.length}</TableCell>
      </MuiTableRow>
    </>
  );
};

TableRow.propTypes = {
  product: productType.isRequired,
};

export default TableRow;
