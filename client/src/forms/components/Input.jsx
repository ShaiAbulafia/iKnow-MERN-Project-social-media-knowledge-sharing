import React from "react";
import { string, bool, object, func, number } from "prop-types";
import TextField from "@mui/material/TextField";
import { makeFirstLetterCapital } from "../utils/algoMethods";
import Grid from "@mui/material/Grid";
import { useTheme } from "../../providers/ThemeProvider";

const Input = ({
  variant,
  type,
  name,
  data,
  label,
  required,
  error,
  onChange,
  rows,
  multiline,
  ...rest
}) => {
  const { isDark } = useTheme();

  return (
    <Grid item xs={12} {...rest}>
      <TextField
        variant={variant}
        label={makeFirstLetterCapital(label)}
        type={type}
        id={name}
        name={name}
        value={data[name] ? data[name] : ""}
        required={required}
        helperText={error}
        error={Boolean(error)}
        onChange={onChange}
        fullWidth
        autoComplete="off"
        size="small"
        multiline={multiline}
        rows={rows}
        color={isDark ? "darkModeColor" : "forthColor"}
      />
    </Grid>
  );
};

Input.propTypes = {
  name: string.isRequired,
  required: bool.isRequired,
  type: string.isRequired,
  error: string,
  onChange: func.isRequired,
  variant: string,
  data: object,
  rows: number.isRequired,
  multiline: bool.isRequired,
};

Input.defaultProps = {
  required: true,
  type: "text",
  variant: "outlined",
  rows: 1,
  multiline: false,
};

export default React.memo(Input);
