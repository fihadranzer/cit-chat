import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

const UserList = () => {
  const auth = getAuth();

  const db = getDatabase();
  const [userlist, setUSerList] = useState([]);
  // console.log(auth.currentUser);
  useEffect(() => {
    let userArr = [];
    const userRef = ref(db, "users");
    onValue(userRef, (snapshot) => {
      snapshot.forEach((item) => {
        userArr.push({
          username: item.val().username,
          email: item.val().email,
          id: item.key,
        });
       
      });
      setUSerList(userArr);
    });
  }, []);
  return (
    <div className="group__list friends__list" style={{ height: "620px" }}>
      <div className="goroup__list_heading">
        <h2>User List </h2>
        <BiDotsVerticalRounded className="icon" />
      </div>

      {userlist.map((item) => (
        auth.currentUser.uid !== item.id &&
        <div className="group__list_box" key={item.id}>
          <div className="profile_image">
            <img src="./assets/images/friendreq.png" alt="" />
          </div>
          <div className="list__info">
            <p className="group__name">{item.username}</p>
            <p className="group__message">{item.email}</p>
          </div>

          <div className="group__btn">
            <button>+</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
