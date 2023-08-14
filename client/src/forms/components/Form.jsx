import React from "react";
import { node, func, string, number, object } from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormButton from "./FormButton";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LoopIcon from "@mui/icons-material/Loop";
import { useTheme } from "../../providers/ThemeProvider";

const Form = ({
  title,
  onSubmit,
  onReset,
  onChange,
  to,
  color,
  spacing,
  styles,
  children,
}) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  return (
    <Box
      component="form"
      color={color}
      sx={{ ...styles }}
      onSubmit={onSubmit}
      autoComplete="off"
      noValidate
    >
      <Typography
        align="center"
        variant="h4"
        m={4}
        color={isDark ? "white" : "forthColor.main"}
      >
        {title.toUpperCase()}
      </Typography>

      <Grid container spacing={spacing}>
        {children}
      </Grid>

      <Grid
        container
        spacing={2}
        my={1}
        display="flex"
        justifyContent="space-between"
      >
        <Grid item xs={12} sm={3}>
          <FormButton
            node={<LoopIcon sx={{ color: "white" }} />}
            component="div"
            size="large"
            onClick={onReset}
            color={isDark ? "primary" : "forthColor"}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormButton
            node={
              <Typography variant="body1" color="white" fontWeight={600}>
                Submit
              </Typography>
            }
            onClick={onSubmit}
            disabled={!!onChange()}
            size="large"
            color={isDark ? "primary" : "mainColor"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

Form.propTypes = {
  children: node.isRequired,
  onSubmit: func.isRequired,
  color: string.isRequired,
  to: string.isRequired,
  spacing: number.isRequired,
  onReset: func.isRequired,
  onChange: func.isRequired,
  title: string,
  styles: object.isRequired,
};

Form.defaultProps = {
  color: "inherit",
  to: "/",
  spacing: 1,
  title: "",
  styles: {},
};

export default React.memo(Form);
