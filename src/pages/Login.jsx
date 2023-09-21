import React, { useState } from "react";
import "../styles/login.css";
import { Grid, TextField, Button, Alert, Collapse } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [wrongPasswordError, setWrongPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordLengthError, setPasswordLengthError] = useState("");

  const [checkPassword, setcheCkPassword] = useState(false);

  let handleIconClick = () => {
    setcheCkPassword(!checkPassword);
  };

  let handleGoogleSignIn = () => {
    console.log("clicked");
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        navigate("/home");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  let handleFbSignIn = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  const handleOnSubmit = () => {
    if (!email) {
      setEmailError("Please Enter your email");
    } else if (!password) {
      setPasswordError("Please Enter your password ");
      setEmailError("");
    } else if (password.length < 8) {
      setPasswordLengthError("Password minimum 8 character in length ");
      setPasswordError("");
    } else {
      //  Login database here
      console.log("data sent");
      setPasswordLengthError(" ");

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          navigate("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("wrong-password")) {
            setWrongPasswordError("Password Doesn't Matched. ");
            setOpen(true);
          } else if (errorCode.includes("user-not-found")) {
            setWrongPasswordError("Email Not Found. ");
            setOpen(true);
          }
        });
    }
  };

  return (
    <section className="login__part">
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <div className="left__side">
            <div className="left__box">
              <h1>Login to your account!</h1>
              <div className="social_btn_box">
                <div
                  className="btn google"
                  onClick={handleGoogleSignIn}
                  style={{ cursor: "pointer" }}>
                  <img
                    src="./assets/images/google.png"
                    alt="google-icon"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <p>Login with Google</p>
                </div>
                <div
                  className="btn facebook"
                  onClick={handleFbSignIn}
                  style={{ cursor: "pointer" }}>
                  <img
                    src="./assets/images/facebook.png"
                    alt="google-icon"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <p>Login with Facebook</p>
                </div>
              </div>

              <br />
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
                  {wrongPasswordError}
                </Alert>
              </Collapse>
              <TextField
                helperText={emailError}
                id="demo-helper-text-misaligned"
                label="Email"
                style={{ width: "360px", marginTop: "30px" }}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />

              <div className="eye">
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
                  style={{ width: "360px", marginTop: "30px" }}
                  type={checkPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {checkPassword ? (
                  <AiFillEye className="eye_icon" onClick={handleIconClick} />
                ) : (
                  <AiFillEyeInvisible
                    className="eye_icon"
                    onClick={handleIconClick}
                  />
                )}
              </div>

              <br />
              <Button variant="contained" onClick={handleOnSubmit}>
                Login to continue
              </Button>

              <p className="signup_msg">
                Don’t have an account ?
                <Link
                  to="/"
                  style={{ textDecoration: "none", marginLeft: "10px" }}>
                  <span>Sign up</span>
                </Link>
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <img
            src="./assets/images/login_bg.png"
            alt="registration_photo"
            style={{ width: "100%", height: "100vh" }}
          />
        </Grid>
      </Grid>
    </section>
  );
};

export default Login;
