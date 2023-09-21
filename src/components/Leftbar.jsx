import React from "react";
import "../styles/leftbar.css";

import { AiOutlineHome, AiOutlineSetting , AiOutlineNotification, AiOutlineLogout } from "react-icons/ai";
import {BsFillChatDotsFill} from 'react-icons/bs'
const Leftbar = () => {
  return (
    <div className="leftbar">
      <div className="leftBar__mainBox">
        <div className="profile__image_box">
          <img src="assets/images/profile_bg.jpg" alt="profile-image" />
        </div>

        <div className="leftbar__menubox">
          <div className="home_icon">
            <AiOutlineHome className="icon" />
          </div>
          <div className="home_icon">
            <BsFillChatDotsFill className="icon" />
          </div>
          <div className="home_icon">
            <AiOutlineNotification className="icon" />
          </div>
          <div className="home_icon">
            <AiOutlineSetting className="icon" />
          </div>
        </div>
        <div className="leftbar__menubox">
          <div className="home_icon">
            <AiOutlineLogout className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
