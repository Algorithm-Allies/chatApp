import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "./UserPopUp/Popup";

function UserProfileSettings() {
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:3500/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="sticky bottom-0 w-full flex flex-col items-center bg-black">
      {showPopup && <Popup />}
      <div
        className="border-t border-gray-200 text-white p-4 w-full hover:bg-gray-800 cursor-pointer"
        onClick={() => setShowPopup(true)}
      >
        <div className="flex items-center">
          <img
            src={
              user.profilePhoto ||
              "https://www.w3schools.com/howto/img_avatar.png"
            }
            alt={`${user.firstName} ${user.lastName}`}
            className="h-8 w-8 rounded-full mr-2"
          />
          <span>
            {user.firstName} {user.lastName}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserProfileSettings;
