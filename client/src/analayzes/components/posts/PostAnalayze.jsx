import React, { useState } from "react";
import { string, bool, arrayOf } from "prop-types";
import Spinner from "../../../components/Spinner";
import Error from "../../../components/Error";
import Typography from "@mui/material/Typography";
import { useTheme } from "../../../providers/ThemeProvider";
import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import PostsSearchBar from "./PostsSearchBar";
import postType from "../../../posts/models/types/postType";

const PostAnalayze = ({ posts, isLoading, error }) => {
  const { isDark } = useTheme();
  const [countPosts, setCount] = useState(5);
  const [switchVal, setSwitch] = useState(true);

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (!posts || !posts.length)
    return (
      <>
        <PostsSearchBar
          countPosts={countPosts}
          setCount={setCount}
          setSwitch={setSwitch}
          switchVal={switchVal}
        />
        <Paper
          elevation={3}
          sx={{
            mt: 3,
            border: 2,
            borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
            backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
          }}
          style={{
            padding: 50,
          }}
        >
          <Typography variant="h5" textAlign="center">
            Oops.. cant find posts in database!
          </Typography>
        </Paper>
      </>
    );

  return (
    <>
      <PostsSearchBar
        countPosts={countPosts}
        setCount={setCount}
        setSwitch={setSwitch}
        switchVal={switchVal}
      />

      <TableContainer component={Paper} sx={{ marginTop: 3 }} elevation={3}>
        <Table
          sx={{
            tableLayout: "fixed",
            minWidth: 500,
            border: 3,
            borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
            backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
          }}
          aria-label="Users table"
        >
          <TableHead />
          <TableBody>
            {switchVal
              ? posts
                  .sort((a, b) => {
                    return b.favorites.length - a.favorites.length;
                  })
                  .slice(0, countPosts)
                  .map((post) => <TableRow key={post._id} post={post} />)
              : posts
                  .sort((a, b) => {
                    return b.rate - a.rate;
                  })
                  .slice(0, countPosts)
                  .map((post) => <TableRow key={post._id} post={post} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

PostAnalayze.propTypes = {
  posts: arrayOf(postType),
  isLoading: bool.isRequired,
  error: string,
};

export default PostAnalayze;
