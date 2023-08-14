import React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "../../../providers/ThemeProvider";
import { Grid, Typography, Paper, TextField } from "@mui/material";
import { func, number } from "prop-types";

const ProductsSearchBar = ({ countProducts, setCount }) => {
  const { isDark } = useTheme();
  const [searchParams, setSearch] = useSearchParams();
  const handleChange = ({ target }) => setSearch({ q: target.value });
  return (
    <Paper
      elevation={3}
      sx={{
        p: 0.5,
        border: 1,
        borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
        backgroundColor: isDark ? "" : "forthColor.main",
      }}
    >
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={4} md={3}>
          <FormControl variant="standard" fullWidth>
            <OutlinedInput
              color="mainColor"
              sx={{ backgroundColor: isDark ? "darkModeColor.main" : "#fff" }}
              placeholder="Search"
              size="small"
              value={searchParams.get("q") ?? ""}
              onChange={handleChange}
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
        <Grid item xs={12} sm={8} md={4}>
          <Typography
            variant="body1"
            fontWeight={700}
            marginLeft={{ xs: 1, sm: 0 }}
          >
            By titles, category, brand or product no.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            type="number"
            defaultValue={countProducts}
            color={isDark ? "darkModeButton" : "mainColor"}
            sx={{
              backgroundColor: isDark ? "darkModeColor.main" : "#fff",
              borderRadius: 1,
            }}
            InputProps={{ inputProps: { min: 1 } }}
            onChange={(e) => setCount(e.target.valueAsNumber)}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={3}>
          <Typography
            variant="body1"
            fontWeight={700}
            marginLeft={{ xs: 1, sm: 0 }}
          >
            Products count
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

ProductsSearchBar.propTypes = {
  countProducts: number.isRequired,
  setCount: func.isRequired,
};

export default ProductsSearchBar;
