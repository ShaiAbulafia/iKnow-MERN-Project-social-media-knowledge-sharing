import React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "../../../providers/ThemeProvider";
import { Grid, Typography, Paper, TextField, Switch } from "@mui/material";
import { bool, func, number } from "prop-types";

const PostsSearchBar = ({ countPosts, setCount, setSwitch, switchVal }) => {
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
        <Grid item xs={12} md={4}>
          <Typography
            variant="body1"
            component="span"
            fontWeight={700}
            margin={1}
          >
            Sort by:
          </Typography>
          <Typography
            variant="body1"
            component="span"
            fontWeight={700}
            color={switchVal ? "text" : "primary"}
          >
            Rate
          </Typography>
          <Switch
            defaultChecked
            onChange={() => {
              setSwitch((prev) => !prev);
            }}
          />
          <Typography
            variant="body1"
            component="span"
            fontWeight={700}
            color={switchVal ? "primary" : "text"}
          >
            Favorites
          </Typography>
        </Grid>
        <Grid item xs={12} sm={5} md={2}>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            type="number"
            defaultValue={countPosts.toString()}
            color={isDark ? "darkModeButton" : "mainColor"}
            sx={{
              backgroundColor: isDark ? "darkModeColor.main" : "#fff",
              borderRadius: 1,
            }}
            InputProps={{ inputProps: { min: 1 } }}
            onChange={(e) => setCount(e.target.valueAsNumber)}
          />
        </Grid>
        <Grid item xs={12} sm={7} md={2}>
          <Typography
            variant="body1"
            fontWeight={700}
            marginLeft={{ xs: 1, sm: 0 }}
          >
            Posts count
          </Typography>
        </Grid>
        <Grid item xs={12} sm={5} md={2}>
          <FormControl variant="standard" fullWidth>
            <OutlinedInput
              color="mainColor"
              sx={{ backgroundColor: isDark ? "darkModeColor.main" : "#fff" }}
              placeholder="Search"
              size="small"
              value={searchParams.get("p") ?? ""}
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
        <Grid item xs={12} sm={7} md={2}>
          <Typography
            variant="body1"
            fontWeight={700}
            marginLeft={{ xs: 1, sm: 0 }}
          >
            by Titles or tags.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

PostsSearchBar.propTypes = {
  countPosts: number.isRequired,
  setCount: func.isRequired,
  setSwitch: func.isRequired,
  switchVal: bool.isRequired,
};

export default PostsSearchBar;
