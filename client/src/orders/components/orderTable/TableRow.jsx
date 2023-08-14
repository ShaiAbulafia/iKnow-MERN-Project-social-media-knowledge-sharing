import React from "react";
import { number } from "prop-types";
import TableCell from "@mui/material/TableCell";
import MuiTableRow from "@mui/material/TableRow";
import { CardMedia } from "@mui/material";
import productType from "../../../products/models/types/productType";

const TableRow = ({ product, amount }) => {
  return (
    <>
      <MuiTableRow>
        <TableCell align="center">{product.productNumber}</TableCell>
        <TableCell align="center">{product.title}</TableCell>
        <TableCell align="center">{product.subtitle}</TableCell>
        <TableCell align="center">
          <CardMedia
            component="img"
            alt={product.image.alt}
            image={product.image.url}
          />
        </TableCell>
        <TableCell align="center">{product.price}</TableCell>
        <TableCell align="center">{amount}</TableCell>
      </MuiTableRow>
    </>
  );
};

TableRow.propTypes = {
  product: productType.isRequired,
  amount: number.isRequired,
};

export default TableRow;
