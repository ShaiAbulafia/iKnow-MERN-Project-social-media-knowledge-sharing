import React, { useState } from "react";
import { func, number } from "prop-types";
import TableCell from "@mui/material/TableCell";
import MuiTableRow from "@mui/material/TableRow";
import { Grid, IconButton, CardMedia } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogUpdate from "../table/DialogUpdate";
import DialogRemove from "../table/DialogRemove";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";

import productType from "../../../products/models/types/productType";

const TableRow = ({ product, amount, onRemove, onUpdate }) => {
  const [isRemoveOpen, setDialogRemove] = useState(false);
  const [isUpdateOpen, setDialogUpdate] = useState(false);
  const [quant, setQuant] = useState(amount);

  const handleDialogRemove = (term) => {
    if (term === "open") return setDialogRemove(true);
    setDialogRemove(false);
  };

  const handleDialogUpdate = (term) => {
    if (term === "open") return setDialogUpdate(true);
    setDialogUpdate(false);
  };

  const handleRemoveProduct = async () => {
    handleDialogRemove();
    await onRemove(product._id);
  };

  const handleUpdateProductAmount = async () => {
    handleDialogUpdate();
    await onUpdate(product._id, quant);
  };

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
            sx={{ maxHeight: 150 }}
          />
        </TableCell>
        <TableCell align="center">{product.price}</TableCell>
        <TableCell align="center">{amount}</TableCell>
        <TableCell align="center">
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <Tooltip title="Edit qt.">
                <IconButton
                  aria-label="Edit qt."
                  sx={{ color: "forthColor.main" }}
                  onClick={() => handleDialogUpdate("open")}
                >
                  <EditIcon color="subColor" />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={6}>
              <Tooltip title="Remove product">
                <IconButton
                  aria-label="Edit qt."
                  onClick={() => handleDialogRemove("open")}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </TableCell>
      </MuiTableRow>
      <DialogUpdate
        isDialogOpen={isUpdateOpen}
        onChangeDialog={handleDialogUpdate}
        onUpdate={handleUpdateProductAmount}
        amount={amount}
        setQuant={setQuant}
        stock={product.stock}
      />
      <DialogRemove
        isDialogOpen={isRemoveOpen}
        onChangeDialog={handleDialogRemove}
        onRemove={handleRemoveProduct}
      />
    </>
  );
};

TableRow.propTypes = {
  product: productType.isRequired,
  amount: number.isRequired,
  onUpdate: func.isRequired,
  onRemove: func.isRequired,
};

export default TableRow;
