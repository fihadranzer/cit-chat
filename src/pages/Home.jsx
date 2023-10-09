import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Alert, Grid } from "@mui/material";

import Leftbar from "../components/Leftbar";
import Search from "../components/Search";
import GroupList from "../components/GroupList";
import FriendRequest from "../components/FriendRequest";
import Friends from "../components/Friends";
import UserList from "../components/UserList";
const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [emailVerify, setEmailverify] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmailverify(user.emailVerified);
      } else {
        console.log("There is no user");
        navigate("/login");
      }
    });
  }, []);
  return (
    <>
      {emailVerify ? (
        <Grid container spacing={2}>
          <Grid item xs={2}>
            {/* left bar component is defined here */}
            <Leftbar active="home" />
          </Grid>
          <Grid item xs={4}>
            <Search></Search>
            <GroupList></GroupList>
            <FriendRequest></FriendRequest>
          </Grid>
          <Grid item xs={3}>
            <Friends />
          </Grid>
          <Grid item xs={3}>
            <UserList />
          </Grid>
        </Grid>
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
