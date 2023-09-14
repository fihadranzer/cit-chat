import React from "react";
import { Grid, TextField, Button } from "@mui/material";
import "../styles/registration.css";
const Registration = () => {
  return (
    <section className="registration__part">
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <div className="left__side">
            <div className="left__box">
              <h1>Get started with easily register</h1>
              <p>Free register and you can enjoy it</p>
              <TextField
                helperText=""
                id="demo-helper-text-misaligned"
                label="Full Name"
                style={{ width: "360px", marginTop: "30px" }}
                type="text"
              />
              <br />
              <TextField
                helperText=""
                id="demo-helper-text-misaligned"
                label="Email"
                style={{ width: "360px", marginTop: "30px" }}
                type="email"
              />{" "}
              <br />
              <TextField
                helperText=""
                id="demo-helper-text-misaligned"
                label="Password"
                style={{ width: "360px", marginTop: "30px" }}
                type="password"
              />{" "}
              <br />
              <TextField
                helperText=""
                id="demo-helper-text-misaligned"
                label="Confirm Password"
                style={{ width: "360px", marginTop: "30px" }}
                type="password"
              />{" "}
              <br />
              <Button variant="contained">Sign up</Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <img
            src="./assets/images/registration_bg.png"
            alt="registration_photo"
            style={{ width: "100%", height: "100vh" }}
          />
        </Grid>
      </Grid>
    </section>
  );
};

export default Registration;
