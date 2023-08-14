import React from "react";
import { arrayOf } from "prop-types";
import MuiTable from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import orderType from "../../models/types/orderType";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import TableBody from "@mui/material/TableBody";
import { useTheme } from "../../../providers/ThemeProvider";
import { animated, useSpring } from "react-spring";

const Table = ({ orders }) => {
  const { isDark } = useTheme();
  const entrance = useSpring({
    from: { x: "-10%", opacity: 0 },
    to: { x: "0%", opacity: 1 },
  });
  return (
    <animated.div style={entrance}>
      <TableContainer component={Paper} sx={{ marginTop: 3 }} elevation={3}>
        <MuiTable
          sx={{
            tableLayout: "fixed",
            border: 3,
            minWidth: 500,
            borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
            backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
          }}
          aria-label="Users table"
        >
          <TableHead />
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id} order={order} />
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </animated.div>
  );
};

Table.propTypes = {
  orders: arrayOf(orderType).isRequired,
};

export default Table;
