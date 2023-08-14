import React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "../../providers/ThemeProvider";
import { Grid, Typography, Paper } from "@mui/material";

const ProductsSearchBar = () => {
  const { isDark } = useTheme();
  const [searchParams, setSearch] = useSearchParams();
  const handleChange = ({ target }) => setSearch({ q: target.value });
  return (
    <Paper
      elevation={3}
      sx={{
        mb: 3,
        p: 0.5,
        border: 1,
        borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
        backgroundColor: isDark ? "" : "forthColor.main",
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <FormControl variant="standard">
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
        <Grid item>
          <Typography variant="body1" fontWeight={700} display="inline-flex">
            Search by Titles, category, brand or product no.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductsSearchBar;
