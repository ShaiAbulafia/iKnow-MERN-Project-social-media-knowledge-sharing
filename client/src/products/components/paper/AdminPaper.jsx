import { Container } from "@mui/system";
import React, { useState } from "react";
import { func, string } from "prop-types";
import { Button, Grid, Paper as MuiPaper, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useTheme } from "../../../providers/ThemeProvider";

const AdminPaper = ({ productId, onChangeProductNum }) => {
  const { isDark } = useTheme();
  const [productNum, setProductNum] = useState("");
  const [numError, setNumError] = useState(null);

  const handleChangeProdNum = () => {
    const random = Math.floor(
      Math.random() * (9999999 - 1000000 + 1) + 1000000
    );
    setProductNum(random);
  };

  const handleChangeInput = ({ target }) => {
    if (999999 < target.value && target.value < 10000000) {
      setProductNum(target.value);
      setNumError(null);
      return;
    }
    setNumError("Must be 7 digits number");
    setProductNum(target.value);
  };

  return (
    <Container
      sx={{
        paddingBottom: 5,
      }}
    >
      <MuiPaper
        elevation={3}
        sx={{
          padding: 3,
          mt: 3,
          textAlign: "center",
          border: 2,
          borderColor: isDark ? "darkModeColor.main" : "thirdColor.main",
          backgroundColor: isDark ? "darkModeColor.main" : "forthColor.main",
        }}
      >
        <Typography variant="h4" color="#fff" align="center" marginBottom={3}>
          Admin board
        </Typography>
        <MuiPaper
          elevation={2}
          sx={{
            padding: 3,
            border: 2,
            borderColor: isDark ? "darkModeColor.main" : "secondColor.main",
            backgroundColor: isDark ? "" : "thirdColor.main",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item lg={2} md={3} xs={12}>
              <Typography>Product number: </Typography>
            </Grid>
            <Grid item lg={4} md={3} xs={12}>
              <TextField
                fullWidth
                placeholder="Enter new Biz number"
                type="number"
                size="small"
                value={productNum}
                onChange={handleChangeInput}
                helperText={numError}
                error={Boolean(numError)}
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <Button
                variant="contained"
                onClick={() => {
                  onChangeProductNum(productNum, productId);
                  setProductNum("");
                }}
                color={isDark ? "success" : "forthColor"}
                sx={{ width: "100%" }}
              >
                <Typography variant="body1" fontWeight={700}>
                  Change
                </Typography>
              </Button>
            </Grid>
            <Grid item md={3} xs={12}>
              <Button
                variant="contained"
                onClick={handleChangeProdNum}
                color={isDark ? "primary" : "mainColor"}
                sx={{ width: "100%" }}
              >
                <Typography variant="body1" fontWeight={700}>
                  Generate number
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </MuiPaper>
      </MuiPaper>
    </Container>
  );
};

AdminPaper.propTypes = {
  productId: string.isRequired,
  onChangeProductNum: func.isRequired,
};

export default AdminPaper;
