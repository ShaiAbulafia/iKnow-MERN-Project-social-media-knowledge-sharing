import { node } from "prop-types";
import { useTheme } from "../../providers/ThemeProvider";
import { Paper } from "@mui/material";

const Main = ({ children }) => {
  const { isDark } = useTheme();

  return (
    <Paper
      sx={{
        pb: 10,
        minHeight: "90vh",
        backgroundColor: isDark ? "" : "secondColor.main",
      }}
    >
      {children}
    </Paper>
  );
};

Main.propTypes = {
  children: node.isRequired,
};

export default Main;
