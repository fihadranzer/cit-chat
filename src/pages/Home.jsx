import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { Alert, Grid } from "@mui/material";

const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [emailVerify, setEmailverify] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmailverify(user.emailVerified);
        console.log(user)
      } else {
        console.log("There is no user");
        navigate('/login')
      }
    });
  }, []);
  return (
    <>
      {emailVerify ? (
        <h1>Home</h1>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Alert variant="filled" severity="warning">
              Please check your email for verify
            </Alert>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      )}
    </>
  );
};

export default Home;
