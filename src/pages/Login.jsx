import React, { useState } from "react";
import "../styles/login.css";
import { Grid, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordLengthError, setPasswordLengthError] = useState("");

  const [checkPassword, setcheCkPassword] = useState(false);

  let handleIconClick = () => {
    setcheCkPassword(!checkPassword);
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
            navigate('/home')
        })
        .catch((err) => {
          console.log(err);
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
                <div className="btn google">
                  <img
                    src="./assets/images/google.png"
                    alt="google-icon"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <p>Login with Google</p>
                </div>
                <div className="btn facebook">
                  <img
                    src="./assets/images/facebook.png"
                    alt="google-icon"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <p>Login with Facebook</p>
                </div>
              </div>

              <br />
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
