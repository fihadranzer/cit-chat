import React from "react";
import { Grid } from "@mui/material";
const Registration = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <h1>Left</h1>
      </Grid>
      <Grid item xs={6}>
        <h1>Right</h1>
      </Grid>
    </Grid>
  );
};

export default Registration;
