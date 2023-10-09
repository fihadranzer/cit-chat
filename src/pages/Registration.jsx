import React, { useState } from "react";
import { Grid, TextField, Button, Alert, Collapse } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import "../styles/registration.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

import { getDatabase, ref, set } from "firebase/database";

const Registration = () => {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordLengthError, setPasswordLengthError] = useState("");
  const [matchedPassword, setMatchedPassword] = useState("");
  const [existingEmailError, setExixtingEmailError] = useState("");

  const handleOnSubmit = () => {
    if (!name) {
      setNameError("please enter fullname");
    } else if (!email) {
      setEmailError("Please Enter your email");
      setNameError("");
    } else if (!password) {
      setPasswordError("Please Enter your password ");
      setEmailError("");
    } else if (password.length < 8) {
      setPasswordLengthError("Password minimum 8 character in length ");
      setPasswordError("");
    } else if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      setPasswordLengthError("");
    } else if (password !== confirmPassword) {
      setMatchedPassword("Password not matched");
      setConfirmPasswordError("");
    } else {
      setMatchedPassword("");
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          console.log(user);
          sendEmailVerification(auth.currentUser).then(() => {
            console.log("Verification email sent");
            updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: "https://example.com/jane-q-user/profile.jpg",
            })
              .then(() => {
                console.log("name set");
                set(ref(db, "users/" + auth.currentUser.uid), {
                  username: name,
                  email: email,
                });
              })
              .catch((error) => {
                console.log(error);
              });
          });
          navigate("/login");
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("email")) {
            setExixtingEmailError(
              "Email is already in use please try with another email"
            );
            setOpen(true);
          }
        });
    }
  };

  return (
    <section className="registration__part">
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <div className="left__side">
            <div className="left__box">
              <h1>Get started with easily register</h1>
              <p>Free register and you can enjoy it</p>

              <Collapse in={open}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}>
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}>
                  {existingEmailError}
                </Alert>
              </Collapse>
              <TextField
                helperText={nameError}
                id="demo-helper-text-misaligned"
                label="Full Name"
                style={{ width: "360px", marginTop: "20px" }}
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <TextField
                helperText={emailError}
                id="demo-helper-text-misaligned"
                label="Email"
                style={{ width: "360px", marginTop: "20px" }}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <TextField
                helperText={
                  passwordError
                    ? passwordError
                    : passwordLengthError
                    ? passwordLengthError
                    : ""
                }
                id="demo-helper-text-misaligned"
                label="Password"
                style={{ width: "360px", marginTop: "20px" }}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <TextField
                helperText={
                  confirmPasswordError
                    ? confirmPasswordError
                    : matchedPassword
                    ? matchedPassword
                    : ""
                }
                id="demo-helper-text-misaligned"
                label="Confirm Password"
                style={{ width: "360px", marginTop: "20px" }}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <br />
              <Button
                variant="contained"
                onClick={handleOnSubmit}
                style={{ borderRadius: "25px" }}>
                Sign up
              </Button>
              <p className="login_msg">
                Already have an account ?
                <Link
                  to="/login"
                  style={{ textDecoration: "none", marginLeft: "10px" }}>
                  <span>Login</span>
                </Link>
              </p>
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
