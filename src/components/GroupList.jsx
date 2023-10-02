import React from "react";
import "../styles/grouplist.css";

import { BiDotsVerticalRounded } from "react-icons/bi";
const GroupList = () => {
  return (
    <div className="group__list">
      <div className="goroup__list_heading">
        <h2>Groups Request</h2>
        <BiDotsVerticalRounded className="icon" />
      </div>

      <div className="group__list_box">
        <div className="profile_image">
          <img src="./assets/images/groupphoto.png" alt="" />
        </div>
        <div className="list__info">
          <p className="group__name">Friends Reunion</p>
          <p className="group__message">Hi Guys, Wassup!</p>
        </div>
        <div className="group__btn">
            <button>Accept</button>
        </div>
      </div>
      <div className="group__list_box">
        <div className="profile_image">
          <img src="./assets/images/groupphoto.png" alt="" />
        </div>
        <div className="list__info">
          <p className="group__name">Friends Reunion</p>
          <p className="group__message">Hi Guys, Wassup!</p>
        </div>
        <div className="group__btn">
            <button>Accept</button>
        </div>
      </div>
      <div className="group__list_box">
        <div className="profile_image">
          <img src="./assets/images/groupphoto.png" alt="" />
        </div>
        <div className="list__info">
          <p className="group__name">Friends Reunion</p>
          <p className="group__message">Hi Guys, Wassup!</p>
        </div>
        <div className="group__btn">
            <button>Accept</button>
        </div>
      </div>
    </div>
  );
};

export default GroupList;
