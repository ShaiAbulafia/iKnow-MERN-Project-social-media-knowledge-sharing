import React from "react";
import { number } from "prop-types";
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useTheme } from "../../providers/ThemeProvider";
import { useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const CrmMenu = ({ ordersCount }) => {
  const { isDark } = useTheme();
  const [searchParams, setSearch] = useSearchParams();

  const handleChangeStatus = ({ target }) => setSearch({ o: target.value });
  const handleChangeOrderNum = ({ target }) => setSearch({ on: target.value });

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: isDark ? "darkModeColor.main" : "forthColor.main",
      }}
    >
      <Grid
        container
        spacing={1}
        p={1}
        pt={0}
        sx={{
          alignItems: "center",
        }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControl fullWidth>
            <OutlinedInput
              color="mainColor"
              sx={{ backgroundColor: isDark ? "darkModeColor.main" : "#fff" }}
              placeholder="Search"
              size="small"
              value={searchParams.get("on") ?? ""}
              onChange={handleChangeOrderNum}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={9}>
          <Typography
            variant="body1"
            fontWeight={700}
            component="span"
            marginLeft={1}
          >
            Search by order number
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControl fullWidth sx={{ display: "flex" }}>
            <InputLabel size="small">Select status</InputLabel>
            <Select
              value={searchParams.get("o") ?? ""}
              onChange={handleChangeStatus}
              size="small"
              color="mainColor"
              sx={{ backgroundColor: isDark ? "darkModeColor.main" : "#fff" }}
            >
              <MenuItem value={"New order"}>New order</MenuItem>
              <MenuItem value={"In process"}>In process</MenuItem>
              <MenuItem value={"On delivery"}>On delivery</MenuItem>
              <MenuItem value={"Delivered"}>Delivered</MenuItem>
              <MenuItem value={"Canceled"}>Canceled</MenuItem>
              <MenuItem value={"Active"}>Active orders</MenuItem>
              <MenuItem value={"All"}>All Orders</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <Typography
            variant="body1"
            fontWeight={700}
            component="span"
            marginLeft={1}
          >
            Default - Active orders
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2} md={4} lg={5} textAlign="right">
          <Typography
            variant="body1"
            fontWeight={700}
            component="span"
            marginRight={2}
          >
            {ordersCount} orders
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

CrmMenu.propTypes = {
  ordersCount: number.isRequired,
};

export default CrmMenu;
