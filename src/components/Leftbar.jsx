import React, { useState } from "react";
import "../styles/leftbar.css";
import { useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { Modal, Typography, Box } from "@mui/material";
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineNotification,
  AiOutlineLogout,
} from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Leftbar = ({ active }) => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleModalOpen = () => {
    setOpen(true);
  };
  
  let signOutChange = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName);
      }
    });
  }, []);

  return (
    <div className="leftbar">
      <div className="leftBar__mainBox">
        <div className="profile__image_box">
          <img src="assets/images/profile_bg.jpg" alt="profile" />
          <h4 style={{ color: "white" }} onClick={handleModalOpen}>{name}</h4>
        </div>

        <div className="leftbar__menubox">
          <div className={`home_icon ${active === "home" && "active"}`}>
            <AiOutlineHome className="icon " />
          </div>
          <div className={`home_icon ${active === "chatting" && "active"}`}>
            <BsFillChatDotsFill className="icon" />
          </div>
          <div className={`home_icon ${active === "notification" && "active"}`}>
            <AiOutlineNotification className="icon" />
          </div>
          <div className={`home_icon ${active === "setting" && "active"}`}>
            <AiOutlineSetting className="icon" />
          </div>
        </div>
        <div className="leftbar__menubox">
          <div className="home_icon" onClick={signOutChange}>
            <AiOutlineLogout className="icon" />
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="leftbar__modal"
        >
        <Box className="leftbar__modal__box">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Leftbar;
