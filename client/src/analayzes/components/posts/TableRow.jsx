import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import MuiTableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import postType from "../../../posts/models/types/postType";
import useUsers from "../../../users/hooks/useUsers";
import UserDisplay from "./UserDisplay";

const TableRow = ({ post }) => {
  const { handleGetUserDisplay } = useUsers();
  const [userDisplay, setUserDisplay] = useState();

  useEffect(() => {
    handleGetUserDisplay(post.userId).then((data) => {
      setUserDisplay(data);
    });
  }, []);

  return (
    <>
      <MuiTableRow>
        <TableCell align="center">
          <Typography variant="h5">{post.title}</Typography>
          <Typography variant="body1">{post.subtitle}</Typography>
        </TableCell>
        <TableCell align="center">
          {userDisplay && <UserDisplay userDisplay={userDisplay} />}
        </TableCell>
        <TableCell align="center">{Number(post.rate).toFixed(2)}</TableCell>
        <TableCell align="center">{post.favorites.length}</TableCell>
      </MuiTableRow>
    </>
  );
};

TableRow.propTypes = {
  post: postType.isRequired,
};

export default TableRow;
