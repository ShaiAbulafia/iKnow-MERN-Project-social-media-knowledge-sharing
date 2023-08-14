import React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "../../providers/ThemeProvider";
import { Grid, Typography, Paper } from "@mui/material";

const UserSearchBar = () => {
  const { isDark } = useTheme();
  const [searchParams, setSearch] = useSearchParams();
  const handleChange = ({ target }) => setSearch({ u: target.value });
  return (
    <Paper
      elevation={3}
      sx={{
        p: 0.5,
        backgroundColor: isDark ? "darkModeColor.main" : "mainColor.main",
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <FormControl variant="standard">
            <OutlinedInput
              color="forthColor"
              sx={{ backgroundColor: isDark ? "darkModeColor.main" : "#fff" }}
              placeholder="Search"
              size="small"
              value={searchParams.get("u") ?? ""}
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
            Search by Name, Last name, Email or ID
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserSearchBar;
