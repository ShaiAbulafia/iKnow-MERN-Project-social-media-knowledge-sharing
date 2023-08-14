import React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "../../providers/ThemeProvider";
import { Typography, Paper, Box } from "@mui/material";
const PostsMenu = () => {
  const { isDark } = useTheme();
  const [searchParams, setSearch] = useSearchParams();
  const handleChange = ({ target }) => setSearch({ p: target.value });
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          mb: 2,
          p: 0.5,
          border: 1,
          borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
          backgroundColor: isDark ? "" : "forthColor.main",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <FormControl variant="standard">
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

          <Typography
            variant="body1"
            fontWeight={700}
            component="span"
            marginLeft={1}
          >
            by Titles or tags.
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export default PostsMenu;
